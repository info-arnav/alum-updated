import nodemailer from "nodemailer";
import cookie from "cookie";
import CryptoJS from "crypto-js";
import QueryString from "./query-string";

export default async function sendOTP(req, res) {
  let body = JSON.parse(req.body);
  let emails = body.emails;
  let recruited = body.recruited;
  let recruited_data = "";
  const cookies = cookie.parse(req.headers.cookie || "");
  const mid_password = CryptoJS.AES.decrypt(
    cookies.login_token,
    process.env.SECRET
  );
  const password = mid_password.toString(CryptoJS.enc.Utf8);

  await fetch(process.env.GRAPHQL_URI, {
    method: "POST",
    headers: {
      apikey: process.env.GRAPHQL_API,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
            mutation{
              insertOneRecruited(data: ${QueryString({
                email: body.auth_email,
                applicants: recruited,
                title: body.position,
                company: body.company,
                description: body.description,
                duration: body.duration,
                stipend: body.stipend,
                deadline: body.deadline,
                email: body.email,
                link: body.link,
                location: body.location,
              })}) {
                  _id
                }
              }
          `,
    }),
  })
    .then((e) => e.json())
    .then(async (e) => {
      recruited_data = e;
      console.log(recruited_data);
      await fetch(process.env.GRAPHQL_URI, {
        method: "POST",
        headers: {
          email: body.auth_email,
          password: password,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation{
                deleteOneRecruitment(query: ${QueryString({
                  _id: body.id,
                })}) {
                  _id
                }
              }
          `,
        }),
      })
        .then((e) => e.json())
        .then(async (e) => {
          let transporter = nodemailer.createTransport({
            host: "smtp.rediffmailpro.com",
            port: 465,
            secure: true,
            auth: {
              user: "admin@alumninet.in",
              pass: process.env.MAIL_PASSWORD,
            },
          });
          let i;
          for (i = 0; i < emails.length; i++) {
            try {
              transporter.sendMail({
                from: `"Alum" <admin@alumninet.in>`,
                to: emails[i],
                subject: "Application Status",
                text: `Application Status`,
                html: `<b>We are sorry to inform but your application for internship at ${body.company} for the position of ${body.position} on our platform was rejected.</b>`,
              });
            } catch {
              continue;
            }
          }
          for (i = 0; i < recruited.length; i++) {
            try {
              transporter.sendMail({
                from: `"Alum" <admin@alumninet.in>`,
                to: recruited[i],
                subject: "Application Status",
                text: `Application Status`,
                html: `<b>Congratulation! You have been offered an internship at ${body.company} for the position of ${body.position} on our portal. The company would most probably be reaching you soon.</b>`,
              });
            } catch {
              continue;
            }
          }
          await fetch(process.env.GRAPHQL_URI, {
            method: "POST",
            headers: {
              apikey: process.env.GRAPHQL_API,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: `
            mutation{
              insertOneCreation(data:${QueryString({
                creator: body.auth_email,
                accepted: JSON.stringify(recruited),
              })}){
                    accepted
                }
              }
          `,
            }),
          }).then((e) =>
            res.json({
              error: false,
              id: recruited_data,
            })
          );
        });
    });
}
