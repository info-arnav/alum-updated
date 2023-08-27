import QueryString from "./query-string";
import cookie from "cookie";
import CryptoJS from "crypto-js";

export default async function editRecruitment(req, res) {
  let body = JSON.parse(req.body);
  const email = body.email;
  const id = body.id;
  delete body.email;
  delete body.id;
  try {
    const password = auth(req.headers.cookie);
    const data = await fetch(process.env.GRAPHQL_URI, {
      method: "POST",
      headers: {
        email: email,
        password: password,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
            mutation{
                updateOneRecruitment(query: ${QueryString({
                  _id: id,
                })}, set: ${QueryString(body)}) {
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
