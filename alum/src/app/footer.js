"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const sendMessage = async () => {};
  return (
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
            <Link href={e[0]} key={e[1].toLowerCase()}>
              {e[0]}
            </Link>
          ))}
        </div>
      </div>
      <div className="large">
        <div className="section-title">Contact</div>
        <input
          className="footer-email"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <textarea
          className="footer-message"
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        {error && <div className="error">{error}</div>}
        <button onClick={sendMessage}>Send Message</button>
      </div>
    </footer>
  );
}
