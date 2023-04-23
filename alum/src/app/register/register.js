"use client";

import Compressor from "compressorjs";
import { useState } from "react";
import Cookies from "universal-cookie";

export default function Register({ type, otp, email }) {
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
          await fetch("/api/register", {
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
                let cookies = new Cookies();
                cookies.set("session_id", e.key, {
                  secure: true,
                  sameSite: "lax",
                  path: "/",
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
  const base64Converter = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    try {
      reader.onload = function () {
        setError("");
        setImage(reader.result);
      };
      reader.onerror = function (error) {
        setError("Some error occured uploading the image.");
      };
    } catch {
      setError("Some error occured uploading the image.");
    }
  };
  const imageHandler = (e) => {
    const image = e.target.files[0];
    try {
      new Compressor(image, {
        quality: 0.8,
        success: (compressedResult) => {
          base64Converter(compressedResult);
        },
      });
    } catch {
      setError("Some error occured uploading the image.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} type="email" disabled></input>
      <input
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&]{8,}$"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      ></input>
      Your password must be at least 8 characters long, include one uppercase
      letter, one lowercase letter, one number, one special character (choose
      from - #,@, $, !, %, *, ?, &), and not contain spaces.
      <input
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&]{8,}$"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        required
      ></input>
      {type == "alumni" && (
        <>
          <div className="file">
            Please attach a scanned image of your degree
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={imageHandler}
            required
          ></input>
          <img
            src={image}
            style={{ width: "100%" }}
            alt="Verification document uploaded by user"
          ></img>
        </>
      )}
      {error && error}
      <button type="submit" disabled={loading}>
        {loading ? "Registering...." : "Register"}
      </button>
    </form>
  );
}
