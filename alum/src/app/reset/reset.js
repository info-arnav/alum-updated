"use client";

import Compressor from "compressorjs";
import { useState } from "react";
import Cookies from "universal-cookie";

export default function Reset({ type, otp, email }) {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&]{8,}$/;
    setLoading(true);
    setError("");
    if (pattern.test(password)) {
      if (password != confirmPassword) {
        setLoading(false);
        setError("Password dont match");
      } else {
        try {
          await fetch("/api/reset", {
            method: "POST",
            body: JSON.stringify({
              email: email,
              otp: otp.toString(),
              password: password,
              files: image,
              type: type,
              verified: type == "student",
            }),
          })
            .then((e) => e.json())
            .then((e) => {
              if (e.error) {
                setLoading(false);
                setError(e.message);
              } else {
                var expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + 100);
                let cookies = new Cookies();
                cookies.set("session_id", e.key, {
                  secure: true,
                  sameSite: "lax",
                  path: "/",
                  expires: expirationDate,
                });
                location.replace("/");
                setLoading("");
              }
            });
        } catch {
          setLoading(false);
          setError("Some error occured");
        }
      }
    } else {
      setLoading(false);
      setError("Please enter the password in the provided format");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="input-field"
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&]{8,}$"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      ></input>
      <input
        className="input-field-2"
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&]{8,}$"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        required
      ></input>
      {error && <div className="error-2">{error}</div>}
      <button
        type="submit"
        disabled={loading}
        className="button-2"
        style={{ backgroundColor: "black" }}
      >
        {loading ? "Changing password...." : "Change Password"}
      </button>
    </form>
  );
}
