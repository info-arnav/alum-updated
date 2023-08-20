import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import QueryString from "./query-string";

export default async function Reset(req, res) {
  let body = JSON.parse(req.body);
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
        let userData = await fetch(process.env.GRAPHQL_URI, {
          method: "POST",
          headers: {
            apikey: process.env.GRAPHQL_API,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
          mutation{
            updateOneRegisteration(query: ${QueryString({
              email: body.email,
            })}, set: ${QueryString({ password: hash })}) {
              email
              api
              type
              verified
              _id
            }
          }
          `,
          }),
        }).then((e) => e.json());
        var expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 100);
        res.setHeader(
          "Set-Cookie",
          `login_token=${CryptoJS.AES.encrypt(
            userData.data.updateOneRegisteration.api,
            process.env.SECRET
          )}; expires=${expirationDate.toUTCString()}; HttpOnly; Secure; SameSite=lax; Path=/`
        );
        res.json({
          error: false,
          key: CryptoJS.AES.encrypt(
            JSON.stringify({
              email: body.email,
              id: userData.data.updateOneRegisteration._id,
              type: userData.data.updateOneRegisteration.type,
              verified: userData.data.updateOneRegisteration.verified,
              image: `${process.env.LINK}api/image/${userData.data.updateOneRegisteration._id}`,
            }),
            process.env.SECRET
          ).toString(),
        });
      });
    } else {
      res.json({ error: true, message: "Invalid OTP" });
    }
  } catch {
    res.json({ error: true, message: "Some Error Occured" });
  }
}
