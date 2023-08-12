import QueryString from "./query-string";

export default async function login(req, res) {
  let body = JSON.parse(req.body);
  try {
    const data = await fetch(process.env.GRAPHQL_URI, {
      method: "POST",
      headers: {
        apikey: process.env.GRAPHQL_API,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
query{
  recruited(query:${QueryString({ _id: body.id })}) {
    title,
    company,
    _id,
  }
}
`,
      }),
    }).then((e) => e.json());
    res.json({
      error: false,
      data: data.data.recruited,
    });
  } catch {
    res.json({ error: true, message: "Some Error Occured" });
  }
}
