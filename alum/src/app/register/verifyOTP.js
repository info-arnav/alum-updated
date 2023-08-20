"use client";

import { useState } from "react";
import Link from "next/link";
import Batch from "./batch";

export default function VerifyOTP({ type, email }) {
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
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
        <Batch type={type} otp={otp} email={email}></Batch>
      ) : (
        <form onSubmit={verifyOTP}>
          <div className="m-2 relative mb-6 w-[70%] mx-auto">
            <input
              type="number"
              className="bg-[#DFE6F9] pl-10 text-lg text-gray-900  rounded-xl w-full p-2.5 "
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="OTP"
            ></input>
            <div className="text-red-600">{error && error}</div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className=" mb-10 m-4 w-[70%] text-white bg-[#00183F] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 text-lg rounded-xl text-md px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 form-button-hover"
            style={{ marginBottom: 10 }}
          >
            {loading ? "Verifying OTP...." : "Verify OTP"}
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
