import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as Realm from "realm-web";

export default async function contact(req, res) {
  let body = JSON.parse(req.body);
  body.email = body.email.replaceAll('"', "'").replaceAll("\n", " ");
  const app = Realm.getApp(process.env.APP_ID);
  try {
    const data = await fetch(process.env.GRAPHQL_URI, {
      method: "POST",
      headers: {
        apikey: process.env.GRAPHQL_API,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
      query{
        otp(query: {email:"${body.email}"}) {
          email
          otp
        }
      }
      `,
      }),
    }).then((e) => e.json());
    data.status = true;
    if (data.data.otp.otp == body.otp) {
      const hash = jwt.sign(body.password, process.env.SECRET);

      await app.emailPasswordAuth.registerUser({
        email: body.email,
        password: hash,
      });

      const credentials = Realm.Credentials.emailPassword(body.email, hash);

      await app.logIn(credentials);
      let verified;
      let type;
      if (body.email[1] == "nsut.ac.in") {
        verified = "true";
        type = "student";
      } else {
        verified = "false";
        type = "alumni";
      }
      let registeredUser = await fetch(process.env.GRAPHQL_URI, {
        method: "POST",
        headers: {
          email: body.email,
          password: hash,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation{
              insertOneRegisteration(data:{email:"${body.email}",password:"${hash}",type:"${type}",files:"${body.files}",verified:"${verified}"}) {
                email
              }
            }
            `,
        }),
      }).then((e) => e.json());
      if (registeredUser.data.insertOneRegisteration.email == body.email) {
        res.json({
          error: false,
          key: jwt.sign(
            {
              password: hash,
              email: body.email,
              type: body.type,
              verified: body.verified,
            },
            process.env.SECRET
          ),
        });
      } else {
        res.json({ error: true, message: "Some Error Occured" });
      }
    } else {
      res.json({ error: true, message: "Invalid OTP" });
    }
  } catch {
    res.json({ error: true, message: "Some Error Occured" });
  }
}
