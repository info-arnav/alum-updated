import CryptoJS from "crypto-js";
import cookie from "cookie";
import QueryString from "./query-string";

export default async function login(req, res) {
  let body = JSON.parse(req.body);
  const cookies = cookie.parse(req.headers.cookie || "");
  try {
    const mid_password = CryptoJS.AES.decrypt(
      cookies.login_token,
      process.env.SECRET
    );
    const password = mid_password.toString(CryptoJS.enc.Utf8);
    const userdata = await fetch(process.env.GRAPHQL_URI, {
      method: "POST",
      headers: {
        email: body.auth_email,
        password: password,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
  query{
    registeration(query:${QueryString({ email: body.auth_email })}) {
      batch
    }
  }
  `,
      }),
    }).then((e) => e.json());
    const data = await fetch(process.env.GRAPHQL_URI, {
      method: "POST",
      headers: {
        email: body.auth_email,
        password: password,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
query{
  registerations(limit:${body.num || 10},query:${QueryString(
          userdata.data.registeration.batch
            ? { batch: userdata.data.registeration.batch, verified: "true" }
            : { verified: "true" }
        )}) {
    batch,
    bio,
    name,
    _id
  }
}
`,
      }),
    }).then((e) => e.json());
    res.json({
      error: false,
      data: data.data.registerations,
    });
  } catch {
    res.json({ error: true, message: "Some Error Occured" });
  }
}
