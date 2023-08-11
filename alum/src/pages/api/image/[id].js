import QueryString from "../query-string";
import image from "./image";

export default async function Image(req, res) {
  const { id } = req.query;
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
      image(query:${QueryString({ id: id })}) {
      image
      }
      }
    `,
      }),
    }).then((e) => e.json());
    if (data.data.image != null) {
      let img = Buffer.from(data.data.image.image.split(",")[1], "base64");
      res.writeHead(200, {
        "Content-Type": "image",
        "Content-Length": img.length,
      });
      res.end(img);
    } else {
      let img = Buffer.from(image.data.split(",")[1], "base64");
      res.writeHead(200, {
        "Content-Type": "image",
        "Content-Length": img.length,
      });
      res.end(img);
    }
  } catch {
    let img = Buffer.from(image.data.split(",")[1], "base64");
    res.writeHead(200, {
      "Content-Type": "image",
      "Content-Length": img.length,
    });
    res.end(img);
  }
}
