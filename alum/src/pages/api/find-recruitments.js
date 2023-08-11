import QueryString from "./query-string";
import cookie from "cookie";
import CryptoJS from "crypto-js";

export default async function findRecruitment(req, res) {
  let body = JSON.parse(req.body);
  const email = body.auth_email;
  delete body.auth_email;
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
        email: email,
        password: password,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
            {
                recruitments(query: ${QueryString(body)}) {
                  title
                  description
                  location
                  duration
                  company
                  email
                  link
                  _id
                  description
                  applicants
                  stipend
                  deadline
                }
              }
          `,
      }),
    }).then((e) => e.json());
    res.json({ error: false, data: data.data.recruitments });
  } catch {
    res.json({ error: true, message: "Some error occured" });
  }
}
