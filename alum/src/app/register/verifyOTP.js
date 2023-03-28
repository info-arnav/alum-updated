"use client";

import { useState } from "react";
import Register from "./register";

export default function VerifyOTP({ type, email }) {
  const [error, setError] = useState("");
  const [otp, setOtp] = useState(0);
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const verifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await fetch("/api/otp-verify", {
        method: "POST",
        body: JSON.stringify({ email: email, otp: otp.toString() }),
      })
        .then((e) => e.json())
        .then((e) => {
          if (e.error) {
            setLoading(false);
            setError(e.message);
          } else {
            setLoading("");
            setError("");
            setValidated(true);
          }
        });
    } catch {
      setLoading(false);
      setError("Some error occured");
    }
  };
  return (
    <>
      {validated ? (
        <Register type={type} otp={otp} email={email}></Register>
      ) : (
        <form onSubmit={verifyOTP}>
          <input
            type="number"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="OTP"
          ></input>
          {error && error}
          <button type="submit" disabled={loading}>
            {loading ? "Verifying OTP...." : "Verify OTP"}
          </button>
        </form>
      )}
    </>
  );
}
