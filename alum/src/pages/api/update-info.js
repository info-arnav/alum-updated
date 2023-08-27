import cookie from "cookie";
import CryptoJS from "crypto-js";
import QueryString from "./query-string";
import auth from "./auth";

export default async function updateInfo(req, res) {
  let body = JSON.parse(req.body);
  try {
    const password = auth(req.headers.cookie);
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
