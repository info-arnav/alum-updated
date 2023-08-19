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
    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&]{8,}$/;
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
    <div className="relative h-[calc(100vh - 100px)]">
      <form
        onSubmit={handleSubmit}
        className="w-full absolute top-[15%] flex flex-col justify-center items-center"
      >
        <div class=" font-bold text-4xl md:text-5xl m-2">Set New Password</div>
        <br></br>
        <br></br>
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
            className="input-field pl-10 bg-[#DFE6F9] text-gray-900 text-lg rounded-xl w-full p-2.5 bol"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&]{8,}$"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          ></input>
        </div>
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
            className="input-field pl-10 bg-[#DFE6F9] text-gray-900 text-lg rounded-xl w-full p-2.5 bol"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&]{8,}$"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          ></input>
        </div>
        {error && <div className="error-2 text-red-600">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="OTP mb-10 m-4 w-[85%] lg:w-[35%] md:w-[50%] text-white bg-[#00183F] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 text-lg rounded-xl text-md px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          {loading ? "Changing password...." : "Change Password"}
        </button>
      </form>
    </div>
  );
}
