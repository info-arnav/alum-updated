import cookie from "cookie";
import CryptoJS from "crypto-js";
import QueryString from "./query-string";
const algoliasearch = require("algoliasearch");

export default async function Requests(req, res) {
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
    updateOneRegisteration(query:${QueryString({
      email: body.second_email,
    })}, set:${QueryString({
          verified: body.verified,
          error: body.error,
        })}) {
      files
      email
      _id
    }
  }
  `,
      }),
    }).then((e) => e.json());
    if (body.verified == "true") {
      console.log(data.data.updateOneRegisteration._id);
      await index
        .saveObject({
          type: body.type,
          email: body.second_email,
          objectID: data.data.updateOneRegisteration._id,
          image: `https://alumninet.in/api/image/${data.data.updateOneRegisteration._id}`,
        })
        .then(() => {
          res.json({
            error: false,
            data: data.data.updateOneRegisteration,
          });
        });
    } else {
      res.json({
        error: false,
        data: data.data.registeration,
      });
    }
  } catch {
    res.json({ error: true, message: "Some Error Occured" });
  }
}
