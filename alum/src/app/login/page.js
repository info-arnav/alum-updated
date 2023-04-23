"use client";

import { useState } from "react";
import Cookies from "universal-cookie";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    let data = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
    }).then((e) => e.json());
    if (data.error) {
      setError(data.message);
      setLoading(false);
    } else {
      let cookies = new Cookies();
      cookies.set("session_id", data.key, {
        secure: true,
        sameSite: "lax",
        domain: ".nsut.alumninet.in",
        path: "/",
      });
      location.replace("/");
      setLoading("");
    }
  };
  return (
    <div className="login-page">
      <main className="login">
        <main className="overlay"></main>
        <div className="container">
          <div className="title">Login</div>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value.toLowerCase().replaceAll(" ", ""))
              }
            ></input>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            {error && error}
            <button type="submit" disabled={loading}>
              {loading ? "Logging you in...." : "Login"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
