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
      batch
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
          batch: data.data.updateOneRegisteration.batch,
        })
        .then(async () => {
          await transporter
            .sendMail({
              from: `"Nalum" <admin@alumninet.in>`,
              to: body.second_email,
              subject: "Nalum Account Verified",
              text: `Congratulations, your Nalum if has been verified. Login now to use the platform.`,
              html: `
              <p>
              Hi,
              <br>
              <br>
              Welcome to Nalum, the NSUT networking platform. We are pleased to inform you that your account as an alumni has been <b>verified</b>.
              <br>
              <br>
              You can login now <a href="${process.env.LINK}/login">here</a> to access your account. Here are a list of features you can try out - 
              <br>
              1. <a href="${process.env.LINK}/profile">Update your profile</a>
              <br>
              2. <a href="${process.env.LINK}/recruitment">Recruit from one of the best engineering college of India, NSUT</a>
              <br>
              3. Search for your fellow batchmates from the small search icon on the top
              <br>
              4. <a href="${process.env.LINK}">Get to know about the upcoming events at the university.</a>
              <br>
              <br>
              We hope you enjoy the platform and wish you all the best for your future endevours.
              <br>
              <br>
              Regards
              <br>
              Team Nalum
              </p>
              `,
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
          from: `"Nalum" <admin@alumninet.in>`,
          to: body.second_email,
          subject: "Nalum Account Verification Failed",
          text: `Your Nalum profile wasnt verified. Update the documents to request verification again.`,
          html: `
              <p>
              Hi,
              <br>
              <br>
              We are sorry to inform you that your account registeration as an alumni was unsuccessfull. You can try updating the documents at your <a href="${process.env.LINK}/login">bio</a>, this will request verification again.<br>
              <br>
              <br>
              The cause of the failure of verification can be that - 
              <br>
              1. The image doesnt clearly show that you are an exNSUTian
              <br>
              2. Someone else has already registered with your identity.
              <br>
              <br>
              In case of any queries feel free to reach us at admin@alumninet.in
              <br>
              <br>
              Regards
              <br>
              Team Nalum
              </p>
              `,
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
