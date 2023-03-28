"use client";

import { useState } from "react";
import "./register.css";
import SendOTP from "./sendOTP";

export default function Register() {
  const [type, setType] = useState("alumni");

  return (
    <main className="register">
      <div className="container">
        <div className="title">Registeration</div>
        <div className="options">
          <button
            className={`right ${type == "alumni" && "active"}`}
            onClick={(e) => {
              setType("alumni");
            }}
          >
            Alumni
          </button>
          <button
            className={`left ${type == "student" && "active"}`}
            onClick={(e) => {
              setType("student");
            }}
          >
            Student
          </button>
        </div>
        <SendOTP type={type}></SendOTP>
      </div>
    </main>
  );
}
