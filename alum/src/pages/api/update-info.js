import cookie from "cookie";
import CryptoJS from "crypto-js";
import QueryString from "./query-string";

export default async function updateInfo(req, res) {
  let body = JSON.parse(req.body);
  const cookies = cookie.parse(req.headers.cookie || "");
  try {
    const mid_password = CryptoJS.AES.decrypt(
      cookies.login_token,
      process.env.SECRET
    );
    const password = mid_password.toString(CryptoJS.enc.Utf8);
    const data = await fetch(process.env.GRAPHQL_URI, {
      method: "POST",
      headers: {
        email: body.email,
        password: password,
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
      res.json({ loggedIn: false });
    } else {
      res.json({
        error: false,
        loggedIn: true,
        newData: {
          email: body.email,
          type: data.data.registeration.type,
          verified: data.data.registeration.verified,
          id: data.data.registeration._id,
        },
        key: CryptoJS.AES.encrypt(
          JSON.stringify({
            email: body.email,
            type: data.data.registeration.type,
            verified: data.data.registeration.verified,
            id: data.data.registeration._id,
          }),
          process.env.SECRET
        ).toString(),
      });
    }
  } catch {
    res.json({ loggedIn: true, error: "Some error occured" });
  }
}
