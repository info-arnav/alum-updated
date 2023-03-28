"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import "./login.css";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      let data = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
      }).then((e) => e.json());
      if (data.error) {
        setError(data.message);
        setLoading(false);
      } else {
        setLoading(false);
        redirect("/");
      }
    } catch {
      setLoading(false);
      setError("Some error occured");
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
          <button type="submit">
            {loading ? "Logging you in...." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
