"use client";

import { useState } from "react";
import Reset from "./reset";
export default function VerifyOTP({ email }) {
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
        <Reset otp={otp} email={email}></Reset>
      ) : (
        <div
          className="relative"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "calc(100vh - 100px)",
          }}
        >
          <form
            onSubmit={verifyOTP}
            className="w-full flex flex-col justify-center items-center"
          >
            <div className=" font-bold text-4xl md:text-5xl m-2">
              Email Verification
            </div>
            <div className="  text-[#717171] text-lg m-2">
              We have sent a code to your email ID:
            </div>
            <div className="  text-[#717171] text-lg m-2">{email}</div>
            <div className="m-2 relative mb-4 w-[85%] lg:w-[35%] md:w-[50%] mx-auto">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  viewBox="0 0 24 24"
                  id="key-hole"
                >
                  <path d="M12,8a2,2,0,0,0-2,2,2,2,0,0,0,1,1.72V15a1,1,0,0,0,2,0V11.72A2,2,0,0,0,14,10,2,2,0,0,0,12,8Zm0-6A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"></path>
                </svg>
              </div>
              <input
                type="number"
                className="input-field pl-10 bg-[#DFE6F9] text-gray-900 text-lg rounded-xl w-full p-2.5 bol"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="OTP"
              ></input>
            </div>
            {error && <div className="error text-red-600">{error}</div>}
            <button
              type="submit"
              disabled={loading}
              className="form-button-hover OTP mb-10 m-4 w-[85%] lg:w-[35%] md:w-[50%] text-white bg-[#00183F] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 text-lg rounded-xl text-md px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              {loading ? "Verifying OTP...." : "Verify OTP"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
