import cookie from "cookie";
import CryptoJS from "crypto-js";
import QueryString from "./query-string";
import auth from "./auth";

export default async function Requests(req, res) {
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
    registerations(limit: 10, query:${QueryString({
      verified: "false",
      type: "alumni",
      error: "",
    })}) {
      files
      email
      roll
      work_status
      batch
      department
      course
      phone
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
