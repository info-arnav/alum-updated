import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import QueryString from "./query-string";

export default async function login(req, res) {
  let body = JSON.parse(req.body);
  try {
    const userData = await fetch(process.env.GRAPHQL_URI, {
      method: "POST",
      headers: {
        apikey: process.env.GRAPHQL_API,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query{
              registeration(query: ${QueryString({ email: body.email })}) {
                email
                password
              }
            }
        `,
      }),
    }).then((e) => e.json());
    if (userData.data.registeration == null) {
      res.json({ error: true, message: "Invalid Credentials" });
    } else {
      bcrypt.compare(
        body.password,
        userData.data.registeration.password,
        async function (err, hash) {
          if (hash) {
            const data = await fetch(process.env.GRAPHQL_URI, {
              method: "POST",
              headers: {
                apikey: process.env.GRAPHQL_API,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                query: `
        query{
          registeration(query:${QueryString({ email: body.email })}) {
            email
            type
            verified
            api
            _id
          }
        }
      `,
              }),
            }).then((e) => e.json());
            if (data.error) {
              res.json({ error: true, message: "Invalid Credentials" });
            } else {
              var expirationDate = new Date();
              expirationDate.setDate(expirationDate.getDate() + 100);
              res.setHeader(
                "Set-Cookie",
                `login_token=${CryptoJS.AES.encrypt(
                  data.data.registeration.api,
                  process.env.SECRET
                )}; expires=${expirationDate.toUTCString()}; HttpOnly; Secure; SameSite=lax; Path=/`
              );
              res.json({
                error: false,
                key: CryptoJS.AES.encrypt(
                  JSON.stringify({
                    email: body.email,
                    id: data.data.registeration._id,
                    type: data.data.registeration.type,
                    verified: data.data.registeration.verified,
                  }),
                  process.env.SECRET
                ).toString(),
              });
            }
          } else {
            res.json({ error: true, message: "Invalid Credentials" });
          }
        }
      );
    }
  } catch {
    res.json({ error: true, message: "Some Error Occured" });
  }
}
