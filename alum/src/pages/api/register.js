import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
const crypto = require("crypto");
import * as Realm from "realm-web";
import QueryString from "./query-string";
const algoliasearch = require("algoliasearch");

export default async function register(req, res) {
  const client = algoliasearch(
    process.env.ALGOLIA_MAIN,
    process.env.ALGOLIA_PRIVATE
  );
  const index = client.initIndex("dev_alum");
  let body = JSON.parse(req.body);
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
        otp(query: ${QueryString({ email: body.email })}) {
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

        const userId = await app.logIn(credentials);
        let verified;
        let type;
        if (
          body.email.split("@")[1] == "nsut.ac.in" &&
          body.type == "student"
        ) {
          verified = "true";
          type = "student";
        } else {
          const verifiedData = await fetch(process.env.GRAPHQL_URI, {
            method: "POST",
            headers: {
              apikey: process.env.GRAPHQL_API,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: `
            query{
              verified(query: ${QueryString({ email: body.email })}) {
                email
              }
            }
            `,
            }),
          }).then((e) => e.json());
          try {
            if (verifiedData.data.verified.email == body.email) {
              verified = "true";
              type = "alumni";
            } else {
              verified = "false";
              type = "alumni";
            }
          } catch {
            verified = "false";
            type = "alumni";
          }
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
              insertOneRegisteration(data:${QueryString({
                email: body.email,
                password: hash,
                api: apiKey,
                files: body.files,
                applications: "[]",
                honors: "[]",
                projects: "[]",
                education: "[]",
                occupation: "[]",
                error: "",
                phone: body.phone,
                course: body.course,
                department: body.department,
                batch: body.batch,
                work_status: body.work_status,
                roll: body.roll,
              })}) {
                email
                _id
              }
            }
            `,
          }),
        }).then((e) => e.json());
        await fetch(process.env.GRAPHQL_URI, {
          method: "POST",
          headers: {
            apikey: process.env.GRAPHQL_API,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
            mutation{
              updateOneRegisteration(query:${QueryString({
                email: body.email,
              })},set:${QueryString({
              verified: verified,
              type: type,
              user_id: userId.id,
            })}) {
                email
              }
            }
            `,
          }),
        });
        if (verified == "true") {
          await index.saveObjects([
            {
              type: type,
              email: registeredUser.data.insertOneRegisteration.email,
              objectID: registeredUser.data.insertOneRegisteration._id,
              image: `${process.env.LINK}api/image/${registeredUser.data.insertOneRegisteration._id}`,
            },
          ]);
        }
        if (registeredUser.data.insertOneRegisteration.email == body.email) {
          var expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 100);
          res.setHeader(
            "Set-Cookie",
            `login_token=${CryptoJS.AES.encrypt(
              apiKey,
              process.env.SECRET
            )}; expires=${expirationDate.toUTCString()}; HttpOnly; Secure; SameSite=lax; Path=/`
          );
          res.json({
            error: false,
            key: CryptoJS.AES.encrypt(
              JSON.stringify({
                id: registeredUser.data.insertOneRegisteration._id,
                email: body.email,
                type: body.type,
                verified: verified,
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
