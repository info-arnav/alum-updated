"use client";

import { useState } from "react";
import VerifyOTP from "./verifyOTP";

export default function SendOTP({ type }) {
  const [oldType, setOldType] = useState(type);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  if (oldType != type) {
    setOldType(type);
    setError("");
    setEmail("");
    setLoading(false);
    setValidated(false);
  }
  const sendStudentOTP = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (
      email.split("@")[1] &&
      email.split("@")[1].toLowerCase() == "nsut.ac.in"
    ) {
      sendOTP(e);
    } else {
      setLoading(false);
      setError("Email should be of the format @nsut.ac.in");
    }
  };
  const sendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await fetch("/api/otp-send", {
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
        <VerifyOTP type={type} email={email}></VerifyOTP>
      ) : (
        <form onSubmit={type == "student" ? sendStudentOTP : sendOTP}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={type == "student" ? "NSUT Email ID" : "Email Id"}
          ></input>
          {error && error}
          <button type="submit" disabled={loading}>
            {loading ? "Sending OTP...." : "Send OTP"}
          </button>
        </form>
      )}
    </>
  );
}
