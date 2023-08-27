import QueryString from "./query-string";
import CryptoJS from "crypto-js";
import cookie from "cookie";
import auth from "./auth";

export default async function login(req, res) {
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
