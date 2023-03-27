export default async function contact(req, res) {
  const data = await fetch(process.env.GRAPHQL_URI, {
    method: "POST",
    headers: {
      email: "admin@itsdope.in",
      password: "Arnav300804",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query{
        registerations(query: {}) {
          _id
          batch
          bio
          branch
          email
          name
          occupation
          password
          type
          verified
          files
        }
      }
    `,
    }),
  }).then((e) => e.json());
  data.status = true;
  res.json(data);
}
