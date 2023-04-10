import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
const crypto = require("crypto");
import * as Realm from "realm-web";

export default async function register(req, res) {
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
      bcrypt.hash(body.password, 10, async function (err, hash) {
        let apiKey = crypto
          .randomBytes(Math.ceil(32 / 2))
          .toString("hex")
          .slice(0, 32);

        await app.emailPasswordAuth.registerUser({
          email: body.email,
          password: apiKey,
        });

        const credentials = Realm.Credentials.emailPassword(body.email, apiKey);

        await app.logIn(credentials);
        let verified;
        let type;
        if (
          body.email.split("@")[1] == "nsut.ac.in" &&
          body.type == "student"
        ) {
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
            password: apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
            mutation{
              insertOneRegisteration(data:{email:"${body.email}",password:"${hash}", api:"${apiKey}" ,type:"${type}",files:"${body.files}",verified:"${verified}"}) {
                email
              }
            }
            `,
          }),
        }).then((e) => e.json());
        if (registeredUser.data.insertOneRegisteration.email == body.email) {
          res.setHeader(
            "Set-Cookie",
            `User=${CryptoJS.AES.encrypt(
              apiKey,
              process.env.SECRET
            )}; HttpOnly; Secure; SameSite=lax`
          );
          res.json({
            error: false,
            key: CryptoJS.AES.encrypt(
              JSON.stringify({
                email: body.email,
                type: body.type,
                verified: data.data.registeration.verified,
              }),
              process.env.SECRET
            ).toString(),
          });
        } else {
          res.json({ error: true, message: "Some Error Occured" });
        }
      });
    } else {
      res.json({ error: true, message: "Invalid OTP" });
    }
  } catch {
    res.json({ error: true, message: "Some Error Occured" });
  }
}
