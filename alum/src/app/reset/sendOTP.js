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
        <div
          className="relative h-[calc(100vh - 100px)]"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "calc(100vh - 100px)",
          }}
        >
          <form
            onSubmit={sendOTP}
            className="w-full flex flex-col justify-center items-center"
          >
            <div className=" font-bold text-4xl md:text-5xl m-2">
              Forgot Password
            </div>
            <div className="  text-[#717171] text-lg m-2">
              No worries, we’ll send you reset instructions
            </div>

            <div className="m-2 relative mb-4 w-[85%] lg:w-[35%] md:w-[50%] mx-auto">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-black dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </div>
              <input
                type="email"
                className="input-field pl-10 bg-[#DFE6F9] text-gray-900 text-lg rounded-xl w-full p-2.5 bol"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value.toLowerCase().replaceAll(" ", ""))
                }
                placeholder={"Enter your Email ID"}
              ></input>
            </div>
            {error && <div className="error text-red-600">{error}</div>}
            <button
              type="submit"
              disabled={loading}
              className="form-button-hover OTP mb-10 m-4 w-[85%] lg:w-[35%] md:w-[50%] text-white bg-[#00183F] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 text-lg rounded-xl text-md px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              // style={{ backgroundColor: "black" }}
            >
              {loading ? "Sending OTP...." : "Send OTP"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
