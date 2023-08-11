"use client";

import { useState } from "react";
import VerifyOTP from "./verifyOTP";
import "./register.css";

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
            className="input-field"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value.toLowerCase().replaceAll(" ", ""))
            }
            placeholder={
              type == "student"
                ? "Enter your NSUT Email ID"
                : "Enter your Email ID"
            }
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
