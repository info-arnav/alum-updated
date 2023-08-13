"use client";

import { useState } from "react";
import SendOTP from "./sendOTP";

export default function Register() {
  return (
    <div className="register-page">
      <SendOTP></SendOTP>
    </div>
  );
}
