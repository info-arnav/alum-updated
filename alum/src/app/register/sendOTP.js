"use client";

import { useState } from "react";
import VerifyOTP from "./verifyOTP";
import Link from "next/link";

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
          <div className="m-2 relative mb-6 w-[70%] mx-auto">
            <input
              type="email"
              className="bg-[#DFE6F9] pl-10 text-lg text-gray-900  rounded-xl w-full p-2.5 "
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
          </div>
          <div className="text-red-600">{error && error}</div>
          <button
            className=" mb-10 m-4 w-[70%] text-white bg-[#00183F] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 text-lg rounded-xl text-md px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 form-button-hover"
            type="submit"
            disabled={loading}
            style={{ marginBottom: 10 }}
          >
            {loading ? "Sending OTP...." : "Send OTP"}
          </button>
          <Link href="/login">
            <div className="text-black-600" style={{ marginTop: 10 }}>
              Already registered ? Login Now
            </div>
          </Link>
        </form>
      )}
    </>
  );
}
