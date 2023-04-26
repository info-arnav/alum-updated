"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
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
        <div className="small">
          <Link href="/">
            <Image
              className="footer-img"
              src="/logo.png"
              width={200}
              height={200}
              alt="Logo of the platform Alum"
            ></Image>
          </Link>
          <Link href="/">
            <div className="title">ALUM</div>
          </Link>
          <div className="description">The NSUT networking site</div>
          <div className="copyright">Copyright Alum @ 2023</div>
        </div>
        <div className="small">
          <div className="section-title">Quick Links</div>
          <div className="links">
            {[
              ["About", "/about"],
              ["Login", "/login"],
              ["Register", "/register"],
              ["Privacy Policy", "/privacy-policy"],
            ].map((e) => (
              <Link key={e[0]} href={e[1].toLowerCase()}>
                {e[0]}
              </Link>
            ))}
          </div>
        </div>
        <div className="large">
          <div className="section-title">Contact Us</div>
          <form onSubmit={sendMessage}>
            <input
              className="footer-email"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
            <textarea
              className="footer-message"
              type="text"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
            <div className="error">{error}</div>
            <button type="submit" disabled={loading}>
              {loading ? "Sending....." : "Send Message"}
            </button>
          </form>
        </div>
      </footer>
    </>
  );
}
