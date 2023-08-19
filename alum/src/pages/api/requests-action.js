import cookie from "cookie";
import CryptoJS from "crypto-js";
import QueryString from "./query-string";
const algoliasearch = require("algoliasearch");
import nodemailer from "nodemailer";

export default async function Requests(req, res) {
  let transporter = nodemailer.createTransport({
    host: "smtp.rediffmailpro.com",
    port: 465,
    secure: true,
    auth: {
      user: "admin@alumninet.in",
      pass: process.env.MAIL_PASSWORD,
    },
  });
  const client = algoliasearch(
    process.env.ALGOLIA_MAIN,
    process.env.ALGOLIA_PRIVATE
  );
  const index = client.initIndex("dev_alum");
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
  mutation{
    updateOneRegisteration(query:${QueryString({
      email: body.second_email,
    })}, set:${QueryString({
          verified: body.verified,
          error: body.error,
        })}) {
      files
      email
      _id
    }
  }
  `,
      }),
    }).then((e) => e.json());
    if (body.verified == "true") {
      await index
        .saveObject({
          type: body.type,
          email: body.second_email,
          objectID: data.data.updateOneRegisteration._id,
          image: `${process.env.LINK}api/image/${data.data.updateOneRegisteration._id}`,
        })
        .then(async () => {
          await transporter
            .sendMail({
              from: `"Alum" <admin@alumninet.in>`,
              to: body.second_email,
              subject: "Alum Account Verified",
              text: `Congratulations, your alum if has been verified. Login now to avail its features.`,
              html: `<b>Congratulations, your alum if has been verified. Login now to avail its features.</b>`,
            })
            .then((e) =>
              res.json({
                error: false,
                data: data.data.updateOneRegisteration,
              })
            );
        });
    } else {
      await transporter
        .sendMail({
          from: `"Alum" <admin@alumninet.in>`,
          to: body.second_email,
          subject: "Alum Account Verification Failed",
          text: `Your Alum profile wasnt verified. Update the documents to request verification again.`,
          html: `<b>Your Alum profile wasnt verified. Update the documents to request verification again.</b>`,
        })
        .then((e) =>
          res.json({
            error: false,
            data: data.data.registeration,
          })
        );
    }
  } catch {
    res.json({ error: true, message: "Some Error Occured" });
  }
}
