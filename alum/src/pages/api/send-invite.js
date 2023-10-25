import QueryString from "./query-string";
import cookie from "cookie";
import nodemailer from "nodemailer";
import CryptoJS from "crypto-js";

export default async function sendInvite(req, res) {
  let body = JSON.parse(req.body);
  const email = body.auth_email;
  delete body.auth_email;
  const cookies = cookie.parse(req.headers.cookie || "");
  let transporter = nodemailer.createTransport({
    host: "smtp.rediffmailpro.com",
    port: 465,
    secure: true,
    auth: {
      user: "admin@alumninet.in",
      pass: process.env.MAIL_PASSWORD,
    },
  });
  try {
    const tempData = await fetch(process.env.GRAPHQL_URI, {
      method: "POST",
      headers: {
        apikey: process.env.GRAPHQL_API,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query{
              registeration(query: ${QueryString({ email: body.email })}) {
                email
              }
            }
        `,
      }),
    }).then((e) => e.json());
    if (tempData.data.registeration == null) {
      const mid_password = CryptoJS.AES.decrypt(
        cookies.login_token,
        process.env.SECRET
      );
      const password = mid_password.toString(CryptoJS.enc.Utf8);
      await fetch(process.env.GRAPHQL_URI, {
        method: "POST",
        headers: {
          email: email,
          password: password,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
        mutation{
            insertOneVerified(data: ${QueryString(body)}) {
              email
            }
          }
          `,
        }),
      }).then(async (e) => {
        await transporter
          .sendMail({
            from: `"Nalum" <admin@alumninet.in>`,
            to: body.email,
            subject: "Invitation For Nalum",
            text: `Invitation For Nalum`,
            html: `
          <p>
          Hi,
          <br>
          <br>
          You were invited to Nalum by one of the alumni of NSUT, Delhi.
          <br>
          <br>
          You can register now at Nalum <a href="${process.env.LINK}register">here</a>.
          <br>
          <br>
          Unlock a world of opportunities and connections at Nalum, the exclusive cross-platform web application designed to empower both NSUT alumni and students. Seamlessly connecting generations, Nalum redefines networking, knowledge sharing, and career advancement within the NSUT community.
          </br>
          <br>
          Regards
          <br>
          Team Nalum
          </p>
          `,
          })
          .then((e) => res.json({ error: false, message: "Invitation Sent" }));
      });
    } else {
      res.json({ error: true, message: "Already Registered" });
    }
  } catch {
    res.json({ error: true, message: "Some error occured" });
  }
}
