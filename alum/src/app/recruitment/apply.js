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
      <button onClick={handleSubmit}>
        {loading
          ? "Processing......"
          : profiles.indexOf(user) == -1
          ? "Apply"
          : "Withdraw"}
      </button>
    </>
  );
}
