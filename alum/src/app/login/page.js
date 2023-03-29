"use client";

import { useState } from "react";
import Cookies from "universal-cookie";
import "./login.css";

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
      cookies.set("User", data.key, {
        secure: true,
        sameSite: "lax",
      });
      location.reload();
      setLoading("");
    }
  };
  return (
    <main className="login">
      <div className="container">
        <div className="title">Login</div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
  );
}
