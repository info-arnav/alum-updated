import CryptoJS from "crypto-js";
import cookie from "cookie";
import QueryString from "./query-string";

export default async function setProfilePicture(req, res) {
  let body = JSON.parse(req.body);
  const cookies = cookie.parse(req.headers.cookie || "");
  try {
    const mid_password = CryptoJS.AES.decrypt(cookies.User, process.env.SECRET);
    const password = mid_password.toString(CryptoJS.enc.Utf8);
    const checkData = await fetch(process.env.GRAPHQL_URI, {
      method: "POST",
      headers: {
        email: body.email,
        password: password,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query{
              image(query: ${QueryString({ email: body.email })}) {
                email
              }
            }
        `,
      }),
    }).then((e) => e.json());
    if (checkData.data.image == null) {
      let data = await fetch(process.env.GRAPHQL_URI, {
        method: "POST",
        headers: {
          email: body.email,
          password: password,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
          mutation{
            insertOneImage(data:${QueryString({
              email: body.email,
              image: body.image,
            })}){
                otp
            }
          }
      `,
        }),
      }).then((e) => e.json());
      res.json({
        error: false,
        data: data,
      });
    } else {
      let data = await fetch(process.env.GRAPHQL_URI, {
        method: "POST",
        headers: {
          email: body.email,
          password: password,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
        mutation{
          updateOneImage(set:${QueryString({
            image: body.image,
          })}, query:${QueryString({ email: body.email })}) {
            email
            image
          }
        }
`,
        }),
      }).then((e) => e.json());
      res.json({
        error: false,
        data: data,
      });
    }
  } catch {
    res.json({ error: true, message: "Some Error Occured" });
  }
}
