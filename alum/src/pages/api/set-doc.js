import CryptoJS from "crypto-js";
import cookie from "cookie";
import QueryString from "./query-string";
import auth from "./auth";

export default async function login(req, res) {
  let body = JSON.parse(req.body);
  try {
    const password = auth(req.headers.cookie);
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
          updateOneRegisteration(set:${QueryString({
            files: body.files,
            error: "",
            roll: body.roll,
            work_status: body.work_status,
            batch: body.batch,
            department: body.department,
            course: body.course,
            phone: body.phone,
          })}, query:${QueryString({ email: body.email })}) {
            files
            roll
            work_status
            batch
            department
            course
            phone
            error
          }
        }
`,
      }),
    }).then((e) => e.json());
    res.json({
      error: false,
      data: data.data.updateOneRegisteration.files,
      error_data: data.data.updateOneRegisteration.error,
      roll: data.data.updateOneRegisteration.roll,
      work_status: data.data.updateOneRegisteration.work_status,
      batch: data.data.updateOneRegisteration.batch,
      department: data.data.updateOneRegisteration.department,
      course: data.data.updateOneRegisteration.course,
      phone: data.data.updateOneRegisteration.phone,
    });
  } catch {
    res.json({ error: true, message: "Some Error Occured" });
  }
}
