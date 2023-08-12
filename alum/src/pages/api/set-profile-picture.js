import CryptoJS from "crypto-js";
import cookie from "cookie";
import QueryString from "./query-string";
const algoliasearch = require("algoliasearch");

export default async function setProfilePicture(req, res) {
  const client = algoliasearch(
    process.env.ALGOLIA_MAIN,
    process.env.ALGOLIA_PRIVATE
  );
  const index = client.initIndex("dev_alum");
  let body = JSON.parse(req.body);
  const cookies = cookie.parse(req.headers.cookie || "");
  try {
    const mid_password = CryptoJS.AES.decrypt(
      cookies.login_token,
      process.env.SECRET
    );
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
              image(query: ${QueryString({ id: body.id })}) {
                id
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
              id: body.id,
              image: body.image,
            })}){
                id
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
          })}, query:${QueryString({ id: body.id })}) {
            id
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
