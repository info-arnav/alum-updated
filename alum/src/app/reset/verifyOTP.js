"use client";

import { useState } from "react";
import Reset from "./reset";
export default function VerifyOTP({ email }) {
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
        <Reset otp={otp} email={email}></Reset>
      ) : (
        <form onSubmit={verifyOTP}>
          <input
            type="number"
            className="input-field"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="OTP"
          ></input>
          {error && <div className="error">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="OTP"
            style={{ backgroundColor: "black" }}
          >
            {loading ? "Verifying OTP...." : "Verify OTP"}
          </button>
        </form>
      )}
    </>
  );
}
