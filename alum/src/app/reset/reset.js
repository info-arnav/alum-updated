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
    const pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
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
        onSubmit={handleSubmit}
        className="w-full flex flex-col justify-center items-center"
      >
        <div className=" font-bold text-4xl md:text-5xl m-2">
          Set New Password
        </div>
        <br></br>
        <br></br>
        <div className="m-2 relative mb-4 w-[85%] lg:w-[35%] md:w-[50%] mx-auto">
          <input
            className="input-field pl-10 bg-[#DFE6F9] text-gray-900 text-lg rounded-xl w-full p-2.5 bol"
            pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          ></input>
        </div>
        <div className="m-2 relative mb-4 w-[85%] lg:w-[35%] md:w-[50%] mx-auto">
          <input
            className="input-field pl-10 bg-[#DFE6F9] text-gray-900 text-lg rounded-xl w-full p-2.5 bol"
            pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          ></input>
          <center style={{ marginTop: 24 }}>
            Password must contain one digit from 1 to 9, one lowercase letter,
            one uppercase letter, one special character, no space, and it must
            be 8-16 characters long.
          </center>
        </div>
        {error && <div className="error-2 text-red-600">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="form-button-hover OTP mb-10 m-4 w-[85%] lg:w-[35%] md:w-[50%] text-white bg-[#00183F] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 text-lg rounded-xl text-md px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          {loading ? "Changing password...." : "Change Password"}
        </button>
      </form>
    </div>
  );
}
