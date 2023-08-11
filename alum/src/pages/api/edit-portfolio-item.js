import QueryString from "./query-string";
import cookie from "cookie";
import CryptoJS from "crypto-js";

export default async function editPortfolioItem(req, res) {
  let body = JSON.parse(req.body);
  let email = body.email;
  const oldData = body.oldData;
  const type = body.category;
  delete body.oldData;
  delete body.category;
  delete body.email;
  const cookies = cookie.parse(req.headers.cookie || "");
  try {
    const mid_password = CryptoJS.AES.decrypt(
      cookies.login_token,
      process.env.SECRET
    );
    const password = mid_password.toString(CryptoJS.enc.Utf8);
    const check = await fetch(process.env.GRAPHQL_URI, {
      method: "POST",
      headers: {
        email: email,
        password: password,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
            query{
                registeration(query: ${QueryString({
                  email: email,
                })}) {
                  ${type}
                }
              }
          `,
      }),
    }).then((e) => e.json());
    if (check.data.registeration[type] == oldData) {
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
                updateOneRegisteration(query: ${QueryString({
                  email: email,
                })}, set: ${QueryString(body)}) {
                  email
                }
              }
          `,
        }),
      }).then((e) => e.json());
      res.json({ error: false, data: data });
    } else {
      res.json({ error: true, message: "Some error occured" });
    }
  } catch {
    res.json({ error: true, message: "Some error occured" });
  }
}
