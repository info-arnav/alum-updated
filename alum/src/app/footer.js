"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Footer({ data }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const sendMessage = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({ email: email, message: message }),
      }).then((e) => {
        setMessage("");
        setEmail("");
        setError("Message Sent");
        setLoading(false);
      });
    } catch {
      setMessage("");
      setEmail("");
      setError("Some error occured");
      setLoading(false);
    }
  };

  return (
    <>
      <footer>
        <div className="row" style={{ marginTop: 40 }}>
          <div className="large">
            <Link href="/">
              <Image
                className="footer-img"
                src="/logo.png"
                width={180}
                height={180}
                alt="Logo of the platform Nalum"
              ></Image>
            </Link>
            <Link href="/">
              <div className="title">Nalum</div>
            </Link>
            <div className="description" style={{ fontSize: 16 }}>
              <center>The NSUT Alumni Student Networking Platform</center>
            </div>
          </div>
          <div className="small">
            <div className="section-title">Quick Links</div>
            <div className="links">
              {!data.loggedIn
                ? [
                    ["About", "/about"],
                    ["Login", "/login"],
                    ["Register", "/register"],
                    ["Privacy Policy", "/privacy-policy"],
                  ].map((e) => (
                    <Link key={e[0]} href={e[1].toLowerCase()}>
                      {e[0]}
                    </Link>
                  ))
                : [
                    ["About", "/about"],
                    ["Privacy Policy", "/privacy-policy"],
                  ].map((e) => (
                    <Link key={e[0]} href={e[1].toLowerCase()}>
                      {e[0]}
                    </Link>
                  ))}
            </div>
          </div>
          <div className="small">
            <div className="section-title">Contact Us</div>
            <form onSubmit={sendMessage}>
              <input
                className="footer-email"
                placeholder="Email"
                type="email"
                style={{ backgroundColor: "#DFE6F9", color: "#8C8C8C" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></input>
              <textarea
                className="footer-message"
                style={{ backgroundColor: "#DFE6F9", color: "#8C8C8C" }}
                type="text"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
              <div className="error">{error}</div>
              <button
                className="bg-white"
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: "#00183F !important",
                  color: "white",
                }}
              >
                {loading ? "Sending....." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
        <hr></hr>
        <div className="row">
          {[
            [
              ["Main Site", "http://nsut.ac.in/"],
              ["About", "http://nsut.ac.in/en/about-campus"],
              ["UMS", "https://ums.nsouict.ac.in/"],
              ["JAC Delhi", "https://jacdelhi.admissions.nic.in/"],
            ],
            [
              ["Notices", "http://nsut.ac.in/en/notices"],
              ["UG", "http://nsut.ac.in/en/ug-admission"],
              ["PG", "http://nsut.ac.in/en/pg-admission"],
              ["PhD", "http://nsut.ac.in/en/phd-admission"],
            ],
            [
              ["Alumni Network", "https://www.imsnsit.org/imsnsit/alumni.htm"],
              [
                "Distingushed Alumni",
                "http://nsut.ac.in/en/alumni/alumni-distinguished",
              ],
              ["Moksha", "https://www.mokshansut.com/"],
              ["Resonanz", "https://www.resonanznsut.com/"],
            ],
            [
              ["IMS", "https://www.imsnsit.org/imsnsit/student.htm"],
              ["International", "http://nsut.ac.in/en/international-admission"],
              ["Programs", "http://nsut.ac.in/en/educational-programmes"],
              [
                "Faculty",
                "http://nsut.ac.in/en/for-faculty/prospective-faculty",
              ],
            ],
          ].map((e) => (
            <div className="small">
              {e.map((e) => (
                <a
                  href={e[1]}
                  style={{ fontSize: 15, marginBottom: 20, marginTop: 20 }}
                >
                  {e[0]}
                </a>
              ))}
            </div>
          ))}
        </div>
        <hr style={{ marginBottom: 0 }}></hr>
        <p style={{ marginTop: 15, fontSize: 13, color: "grey" }}>
          Copyright Nalum @ 2023
        </p>
      </footer>
    </>
  );
}
