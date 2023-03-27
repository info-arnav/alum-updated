import Realm from "realm";
import bcrypt from "bcrypt";

export default async function contact(req, res) {
  let body = JSON.parse(req.body);
  body.email = body.email.replaceAll('"', "'").replaceAll("\n", " ");
  const app = new Realm.App({
    id: process.env.APP_ID,
  });
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
      try {
        bcrypt.hash(body.password, 10, async function (err, hash) {
          await app.emailPasswordAuth.registerUser({
            email: body.email,
            password: hash,
          });

          const credentials = Realm.Credentials.emailPassword(body.email, hash);

          await app.logIn(credentials);

          const user = await fetch(process.env.GRAPHQL_URI, {
            method: "POST",
            headers: {
              email: body.email,
              password: hash,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: `
            mutation{
              insertOneRegisteration(data:{email:"${body.email}",password:"${hash}",type:"${body.type}",files:"${body.files}",verified:"${body.verified}"}) {
                email
              }
            }
            `,
            }),
          }).then((e) => e.json());

          user.error = false;
          res.json(user);
        });
      } catch {
        res.json({ error: true, message: "Some Error Occured" });
      }
    } else {
      res.json({ error: true, message: "Invalid OTP" });
    }
  } catch {
    res.json({ error: true, message: "Some Error Occured" });
  }
}
