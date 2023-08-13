import QueryString from "./query-string";
import CryptoJS from "crypto-js";
import cookie from "cookie";

export default async function login(req, res) {
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
  recruitment(query:${QueryString({ _id: body.id })}) {
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
    res.json({
      error: false,
      data: data.data.recruitment,
    });
  } catch {
    res.json({ error: true, message: "Some Error Occured" });
  }
}
