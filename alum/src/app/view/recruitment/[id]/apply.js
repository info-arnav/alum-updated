"use client";

import { useEffect, useState } from "react";

export default function Apply({ recruitment, user, applicants }) {
  const [profiles, setProfiles] = useState(
    applicants == null ? [] : applicants
  );
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    const fetchedData = await fetch("/api/applicants-recruitment", {
      method: "POST",
      body: JSON.stringify({
        auth_email: email,
        _id: recruitment,
      }),
    }).then((e) => e.json());
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
