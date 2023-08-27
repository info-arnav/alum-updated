import QueryString from "./query-string";
import cookie from "cookie";
import CryptoJS from "crypto-js";
import auth from "./auth";

export default async function applicantsRecruitment(req, res) {
  let body = JSON.parse(req.body);
  const email = body.auth_email;
  delete body.auth_email;
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
            {
                recruiteds(query: ${QueryString(body)}) {
                  applicants
                  email
                }
              }
          `,
      }),
    }).then((e) => e.json());
    res.json({ error: false, data: data == null ? [] : data });
  } catch {
    res.json({ error: true, message: "Some error occured" });
  }
}
