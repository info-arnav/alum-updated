"use client";

import Compressor from "compressorjs";
import Link from "next/link";
import { useState } from "react";
import "./register.css";

export default function Register() {
  const [image, setImage] = useState("");
  const [type, setType] = useState("alumni");
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState(1);
  const [otp, setOtp] = useState(0);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageError, setImageError] = useState("");
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
            setFormState(2);
            setError("");
          }
        });
    } catch {
      setLoading(false);
      setError("Some error occured");
    }
  };
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
            setFormState(3);
            setError("");
          }
        });
    } catch {
      setLoading(false);
      setError("Some error occured");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
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
              setLoading("");
              setError("Registered");
            }
          });
      } catch {
        setLoading(false);
        setError("Some error occured");
      }
    }
  };
  const base64Converter = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setImage(reader.result);
    };
    reader.onerror = function (error) {
      setImageError("Some error occured uploading the image.");
    };
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
      setImageError("Some error occured uploading the image.");
    }
  };
  return (
    <main className="register">
      <div className="container">
        <div className="title">Registeration</div>
        <div className="options">
          <button
            className={`right ${type == "alumni" && "active"}`}
            onClick={(e) => {
              setType("alumni");
              setError("");
              setLoading("");
              setFormState(1);
            }}
          >
            Alumni
          </button>
          <button
            className={`left ${type == "student" && "active"}`}
            onClick={(e) => {
              setType("student");
              setError("");
              setFormState(1);
              setLoading("");
            }}
          >
            Student
          </button>
        </div>
        {formState == 1 ? (
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
        ) : formState == 2 ? (
          <form onSubmit={verifyOTP}>
            <input
              type="number"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="OTP"
            ></input>
            {error && error}
            <button type="submit" disabled={loading}>
              {loading ? "Verifying OTP...." : "Verify OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            ></input>
            <input
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
                <img src={image}></img>
              </>
            )}
            {error && error}
            <button type="submit" disabled={loading}>
              {loading ? "Registering...." : "Register"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
