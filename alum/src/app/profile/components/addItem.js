"use clinet";

import { useState } from "react";

export default function AddItem({
  email,
  data,
  setRefresh,
  refresh,
  show,
  type,
}) {
  const [error, setError] = useState(false);
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    let updatedData = data[type];
    updatedData.push({
      position: position,
      company: company,
      description: description,
      duration: duration,
    });
    data[type] = updatedData;
    updatedData = JSON.stringify(updatedData);
    let bodyData = {
      email: email,
    };
    bodyData[type] = updatedData;
    const res = await fetch(`/api/edit-portfolio-item`, {
      method: "POST",
      body: JSON.stringify(bodyData),
      cache: "no-cache",
    }).then((e) => e.json());
    if (res.error) {
      setError(true);
      setLoading(false);
    } else {
      setRefresh(!refresh);
      setLoading(false);
      show(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          required
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        ></input>
        <input
          required
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        ></input>
        <input
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <input
          required
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        ></input>
        {error && "Some error occured"}
        <button action="submit" disabled={loading}>
          Add Occupation
        </button>
      </form>
      <button onClick={() => show(false)}>Close</button>
    </>
  );
}
