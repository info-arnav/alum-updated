"use clinet";

import { useState } from "react";

export default function EditPortfolio({
  email,
  data,
  setRefresh,
  refresh,
  show,
  type,
  edit,
  location,
  setData,
}) {
  const [error, setError] = useState(false);
  const [title, setTitle] = useState(edit ? data[type][location].title : "");
  const [subTitle, setSubTitle] = useState(
    edit ? data[type][location].subTitle : ""
  );
  const [description, setDescription] = useState(
    edit ? data[type][location].description : ""
  );
  const [duration, setDuration] = useState(
    edit ? data[type][location].duration : ""
  );
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    let updatedData = data[type];
    if (edit) {
      updatedData[location] = {
        title: title,
        subTitle: subTitle,
        description: description,
        duration: duration,
      };
    } else {
      updatedData.push({
        title: title,
        subTitle: subTitle,
        description: description,
        duration: duration,
      });
    }
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
      setData(data);
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <input
          required
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
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
          {edit ? "Edit" : "Add"}
        </button>
      </form>
      <button onClick={() => show(false)}>Close</button>
    </>
  );
}
