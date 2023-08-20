import CryptoJS from "crypto-js";
import cookie from "cookie";
import QueryString from "./query-string";

export default async function login(req, res) {
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
query{
  registeration(query:${QueryString({ email: body.email })}) {
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
      data: data.data.registeration.files,
      error_data: data.data.registeration.error,
      roll: data.data.registeration.roll,
      work_status: data.data.registeration.work_status,
      batch: data.data.registeration.batch,
      department: data.data.registeration.department,
      course: data.data.registeration.course,
      phone: data.data.registeration.phone,
    });
  } catch {
    res.json({ error: true, message: "Some Error Occured" });
  }
}
