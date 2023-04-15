import nodemailer from "nodemailer";
import QueryString from "./query-string";

export default async function sendOTP(req, res) {
  let body = JSON.parse(req.body);
  const data = await fetch(process.env.GRAPHQL_URI, {
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
  if (data.data.registeration == null) {
    data.error = false;
    let transporter = nodemailer.createTransport({
      host: "smtp.rediffmailpro.com",
      port: 465,
      secure: true,
      auth: {
        user: "admin@alumninet.in",
        pass: process.env.MAIL_PASSWORD,
      },
    });
    let OTP = (Math.floor(Math.random() * 10000) + 10000)
      .toString()
      .substring(1);
    try {
      await transporter
        .sendMail({
          from: `"Alum" <admin@alumninet.in>`,
          to: body.email,
          subject: "OTP for Alum Registeration",
          text: `Your OTP is ${OTP}`,
          html: `<b>Your OTP is ${OTP}</b>`,
        })
        .then(async (e) => {
          let otpData = await fetch(process.env.GRAPHQL_URI, {
            method: "POST",
            headers: {
              apikey: process.env.GRAPHQL_API,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: `
              query{
                otp(query: ${QueryString({ email: body.email })}) {
                  email
                }
              }
          `,
            }),
          }).then((e) => e.json());
          if (otpData.data.otp == null) {
            await fetch(process.env.GRAPHQL_URI, {
              method: "POST",
              headers: {
                apikey: process.env.GRAPHQL_API,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                query: `
                mutation{
                    insertOneOtp(data:${QueryString({
                      email: body.email,
                      otp: OTP,
                    })}){
                        otp
                    }
                  }
              `,
              }),
            }).then((e) =>
              res.json({
                error: false,
              })
            );
          } else {
            await fetch(process.env.GRAPHQL_URI, {
              method: "POST",
              headers: {
                apikey: process.env.GRAPHQL_API,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                query: `
                mutation{
                    updateOneOtp(set:${QueryString({
                      otp: OTP,
                    })}, query:${QueryString({ email: body.email })}) {
                      _id
                      email
                      otp
                    }
                  }
            `,
              }),
            }).then((e) =>
              res.json({
                error: false,
              })
            );
          }
        });
    } catch {
      res.json({ error: true, message: "Some Error Occured" });
    }
  } else {
    res.json({ error: true, message: "Already Registered" });
  }
}
