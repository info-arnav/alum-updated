"use client";

import { useState } from "react";

export default function Apply({ recruitment, user, profiles, setProfiles }) {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    await fetch("/api/applicants-recruitment", {
      method: "POST",
      body: JSON.stringify({
        auth_email: user,
        _id: recruitment,
      }),
    })
      .then((e) => e.json())
      .then((e) => {
        setProfiles(e.data);
        setLoading(false);
      });
  };
  return (
    <>
      <button
        onClick={handleSubmit}
        className="border-1 bg-[#1976d2] text-white w-[105px] p-1 rounded-xl font-[14px] hover:bg-[#2d7ecf]"
      >
        {loading
          ? "Processing......"
          : profiles.indexOf(user) == -1
          ? "Apply"
          : "Withdraw"}
      </button>
    </>
  );
}
