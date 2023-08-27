import CryptoJS from "crypto-js";
import cookie from "cookie";
import QueryString from "./query-string";
import auth from "./auth";

export default async function login(req, res) {
  let body = JSON.parse(req.body);
  try {
    const password = auth(req.headers.cookie);
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
