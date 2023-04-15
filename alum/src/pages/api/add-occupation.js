import QueryString from "./query-string";
import cookie from "cookie";
import CryptoJS from "crypto-js";

export default async function addOccupation(req, res) {
  let body = JSON.parse(req.body);

  const cookies = cookie.parse(req.headers.cookie || "");
  try {
    const mid_password = CryptoJS.AES.decrypt(cookies.User, process.env.SECRET);
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
            mutation{
                updateOneRegisteration(query: ${QueryString({
                  email: body.email,
                })}, set: ${QueryString({ occupation: body.occupation })}) {
                  occupation
                  email
                }
              }
          `,
      }),
    }).then((e) => e.json());
    res.json({ error: false, data: data });
  } catch {
    res.json({ error: true, message: "Already Registered" });
  }
}
