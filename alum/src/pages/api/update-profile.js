import QueryString from "./query-string";
import cookie from "cookie";
import CryptoJS from "crypto-js";
const algoliasearch = require("algoliasearch");

export default async function addOccupation(req, res) {
  const client = algoliasearch(
    process.env.ALGOLIA_MAIN,
    process.env.ALGOLIA_PRIVATE
  );
  const index = client.initIndex("dev_alum");
  let body = JSON.parse(req.body);

  const cookies = cookie.parse(req.headers.cookie || "");
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
                updateOneRegisteration(query: ${QueryString({
                  email: body.email,
                })}, set: ${QueryString({
        bio: body.bio,
        name: body.name,
        batch: body.batch,
        linkedin: body.linkedin,
        facebook: body.facebook,
        instagram: body.instagram,
      })}) {
                  email
                  _id
                }
              }
          `,
    }),
  }).then((e) => e.json());
  await index
    .partialUpdateObjects([
      {
        objectID: data.data.updateOneRegisteration._id,
        bio: body.bio,
        name: body.name,
        batch: body.batch,
      },
    ])
    .then(({ objectIDs }) => {
      res.json({ error: false, data: data });
    });
}
