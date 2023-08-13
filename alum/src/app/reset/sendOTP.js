"use client";

import { useState } from "react";
import VerifyOTP from "./verifyOTP";

export default function SendOTP({ type }) {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  const sendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await fetch("/api/reset-otp-send", {
        method: "POST",
        body: JSON.stringify({ email: email }),
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
        <VerifyOTP email={email}></VerifyOTP>
      ) : (
        <form onSubmit={sendOTP}>
          <input
            type="email"
            className="input-field"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value.toLowerCase().replaceAll(" ", ""))
            }
            placeholder={"Enter your Email ID"}
          ></input>
          {error && <div className="error">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="OTP"
            style={{ backgroundColor: "black" }}
          >
            {loading ? "Sending OTP...." : "Send OTP"}
          </button>
        </form>
      )}
    </>
  );
}
