import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";

export default async function login(req, res) {
  let body = JSON.parse(req.body);
  body.email = body.email.replaceAll('"', "'").replaceAll("\n", " ");
  try {
    bcrypt.hash(body.password, 10, async function (err, hash) {
      const data = await fetch(process.env.GRAPHQL_URI, {
        method: "POST",
        headers: {
          email: body.email,
          password: body.password,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
        query{
          registeration(query:{email:"${body.email}"}) {
            email
            type
            verified
          }
        }
      `,
        }),
      }).then((e) => e.json());
      if (data.error) {
        res.json({ error: true, message: "Invalid Credentials" });
      } else {
        res.setHeader(
          "Set-Cookie",
          `User=${CryptoJS.AES.encrypt(
            body.password,
            process.env.SECRET
          )}; HttpOnly; Secure; SameSite=lax`
        );
        res.json({
          error: false,
          key: CryptoJS.AES.encrypt(
            JSON.stringify({
              email: body.email,
              type: data.data.registeration.type,
              verified: data.data.registeration.verified,
            }),
            process.env.SECRET
          ).toString(),
        });
      }
    });
  } catch {
    res.json({ error: true, message: "Some Error Occured" });
  }
}
