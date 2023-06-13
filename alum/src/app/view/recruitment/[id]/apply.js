"use client";

import { useState } from "react";

export default function Apply({ recruitment, user, applicants }) {
  const [profiles, setProfiles] = useState(
    applicants == null ? [] : applicants
  );
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    const fetchedData = await fetch("/api/applicants-recruitment", {
      method: "POST",
      body: JSON.stringify({
        auth_email: user,
        _id: recruitment,
      }),
    })
      .then((e) => e.json())
      .then(() => {
        setProfiles(fetchedData.data.data.updateOneRecruitment.applicants);
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
