import QueryString from "./query-string";
import cookie from "cookie";
import CryptoJS from "crypto-js";

export default async function applicantsRecruitment(req, res) {
  let body = JSON.parse(req.body);
  const email = body.auth_email;
  delete body.auth_email;
  try {
    const cookies = cookie.parse(req.headers.cookie || "");
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
                  applicants
                }
              }
          `,
      }),
    }).then((e) => e.json());
    let array = [];
    data.data.recruitments[0].applicants == null
      ? (array = [])
      : (array = data.data.recruitments[0].applicants);
    if (array.indexOf(email) == -1) {
      array.push(email);
    } else {
      array.splice(array.indexOf(email), 1);
    }
    await fetch(process.env.GRAPHQL_URI, {
      method: "POST",
      headers: {
        email: email,
        password: password,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
            mutation{
                updateOneRecruitment(query: ${QueryString(
                  body
                )}, set: ${QueryString({
          applicants: array,
        })}) {
                  applicants
                }
              }
          `,
      }),
    }).then((e) => e.json());
    res.json({ error: false, data: array });
  } catch {
    res.json({ error: true, message: "Some error occured" });
  }
}
