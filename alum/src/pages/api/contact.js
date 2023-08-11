import QueryString from "./query-string";

export default async function contact(req, res) {
  let body = JSON.parse(req.body);
  const data = await fetch(process.env.GRAPHQL_URI, {
    method: "POST",
    headers: {
      apikey: process.env.GRAPHQL_API,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      mutation {
        insertOneMessage(data: ${QueryString({
          email: body.email,
          message: body.message,
        })}) {
          _id
          email
          message
        }
      }
    `,
    }),
  }).then((e) => e.json());
  data.status = true;
  res.json(data);
}
