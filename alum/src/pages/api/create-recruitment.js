import QueryString from "./query-string";
import cookie from "cookie";
import CryptoJS from "crypto-js";
import auth from "./auth";

export default async function createRecruitment(req, res) {
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
            mutation{
                insertOneRecruitment(data: ${QueryString(body)}) {
                  _id
                }
              }
          `,
      }),
    }).then((e) => e.json());
    res.json({ error: false, data: data });
  } catch {
    res.json({ error: true, message: "Some error occured" });
  }
}
