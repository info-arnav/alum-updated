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
      email: body.auth_email,
      password: password,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
            mutation{
              insertOneRecruited(data: ${QueryString({
                email: body.auth_email,
                title: body.position,
                company: body.company,
                description: body.description,
                duration: body.duration,
                stipend: body.stipend,
                deadline: body.deadline,
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
      await fetch(process.env.GRAPHQL_URI, {
        method: "POST",
        headers: {
          apikey: process.env.GRAPHQL_API,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
              mutation{
                updateOneRecruited(query: ${QueryString({
                  _id: recruited_data.data.insertOneRecruited._id,
                })}, set: ${QueryString({
            applicants: recruited,
          })}) {
                    _id
                  }
                }
            `,
        }),
      });
    })
    .then(async (e) => {
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
                from: `"Nalum" <admin@alumninet.in>`,
                to: emails[i],
                subject: "Update on Nalum Application",
                text: `We are sorry to inform you that you were rejected from ${body.company} for the post of ${body.position}`,
                html: `
                <p>
                Dear applicant,
                <br>
                <br>
                Nalum is sorry to inform you that your application for <b>${body.position}</b> at <b>${body.company}</b> was <b>rejected</b> by the company.
                <br>
                We hope you understand that the contesting pool was highly eligible for the post. This rejection does not in any way doubt your capabilities.
                <br>
                <br>
                You can contact the recruiter at <b>${body.auth_email}</b> in case of any confusions.
                <br>
                <br>
                Regards
                <br>
                Team Nalum
                </p>
                `,
              });
            } catch {
              continue;
            }
          }
          for (i = 0; i < recruited.length; i++) {
            try {
              transporter.sendMail({
                from: `"Nalum" <admin@alumninet.in>`,
                to: recruited[i],
                subject: "Update on Nalum Application",
                text: `We are pleased to inform you that you were accepted for the post of ${body.position} by the company ${body.company}`,
                html: `
                <p>
                Dear applicant,
                <br>
                <br>
                Nalum is pleased to inform you that your application for <b>${body.position}</b> at <b>${body.company}</b> was <b>accepted</b> by the company. You shall soon be contacted by the company official for more details.
                <br>
                <br>
                You can contact the recruiter at <b>${body.auth_email}</b> in case of any confusions.
                <br>
                <br>
                Regards
                <br>
                Team Nalum
                </p>
                `,
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
