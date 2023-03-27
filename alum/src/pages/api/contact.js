export default async function contact(req, res) {
  let body = JSON.parse(req.body);
  body.email = body.email.replaceAll('"', "'").replaceAll("\n", " ");
  const data = await fetch(process.env.GRAPHQL_URI, {
    method: "POST",
    headers: {
      apikey: process.env.GRAPHQL_API,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      mutation {
        insertOneMessage(data: {email: "${body.email
          .replaceAll('"', "'")
          .replaceAll("\n", " ")}", message: "${body.message
        .replaceAll('"', "'")
        .replaceAll("\n", " ")}"}) {
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
