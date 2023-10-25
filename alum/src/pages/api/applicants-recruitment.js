import QueryString from "./query-string";
import cookie from "cookie";
import CryptoJS from "crypto-js";
import nodemailer from "nodemailer";
import { number } from "prop-types";

export default async function applicantsRecruitment(req, res) {
  let body = JSON.parse(req.body);
  const email = body.auth_email;
  delete body.auth_email;
  try {
    const cookies = cookie.parse(req.headers.cookie || "");
    const mid_password = CryptoJS.AES.decrypt(
      cookies.login_token,
      process.env.SECRET
    );
    const password = mid_password.toString(CryptoJS.enc.Utf8);
    const data = await fetch(process.env.GRAPHQL_URI, {
      method: "POST",
      headers: {
        email: email,
        password: password,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
            {
                recruitments(query: ${QueryString(body)}) {
                  applicants
                }
              }
          `,
      }),
    }).then((e) => e.json());
    let array = [];
    data.data.recruitments[0].applicants == null
      ? (array = [])
      : (array = data.data.recruitments[0].applicants);
    if (array.indexOf(email) == -1) {
      array.push(email);
    } else {
      array.splice(array.indexOf(email), 1);
    }
    let tempData = await fetch(process.env.GRAPHQL_URI, {
      method: "POST",
      headers: {
        email: email,
        password: password,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
            mutation{
                updateOneRecruitment(query: ${QueryString(
                  body
                )}, set: ${QueryString({
          applicants: array,
        })}) {
                  applicants
                  email
                }
              }
          `,
      }),
    }).then((e) => e.json());
    let numbers = [
      1, 10, 50, 100, 150, 200, 250, 300, 500, 1000, 1500, 2000, 5000, 10000,
      20000, 30000, 50000,
    ];
    if (
      numbers.includes(tempData.data.updateOneRecruitment.applicants.length) !=
      -1
    ) {
      let transporter = nodemailer.createTransport({
        host: "smtp.rediffmailpro.com",
        port: 465,
        secure: true,
        auth: {
          user: "admin@alumninet.in",
          pass: process.env.MAIL_PASSWORD,
        },
      });
      if (tempData.data.updateOneRecruitment.applicants.length == 1) {
        await transporter.sendMail({
          from: `"Nalum" <admin@alumninet.in>`,
          to: tempData.data.updateOneRecruitment.email,
          subject: "You just got your first applicant.",
          text: `You just got your first applicant.`,
          html: `
        <p>
        Hi,
        <br>
        <br>
        You just got your first applicant for the oppurtunity you posted on Nalum. Check it out now <a href="${process.env.LINK}">here</a>.
        <br>
        <br>
        Regards
        <br>
        Team Nalum
        </p>
        `,
        });
      } else {
        await transporter.sendMail({
          from: `"Nalum" <admin@alumninet.in>`,
          to: tempData.data.updateOneRecruitment.email,
          subject: `You just got your first ${tempData.data.updateOneRecruitment.applicants.length} applicants.`,
          text: `You just got your first ${tempData.data.updateOneRecruitment.applicants.length} applicants.`,
          html: `
        <p>
        Hi,
        <br>
        <br>
        You just got your first ${tempData.data.updateOneRecruitment.applicants.length} applicants for the oppurtunity you posted on Nalum. Check it out now <a href="${process.env.LINK}">here</a>.
        <br>
        <br>
        Regards
        <br>
        Team Nalum
        </p>
        `,
        });
      }
    }
    res.json({ error: false, data: array });
  } catch {
    res.json({ error: true, message: "Some error occured" });
  }
}
