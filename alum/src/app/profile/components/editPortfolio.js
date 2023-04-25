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
  placeholder,
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
    let oldData = JSON.stringify(data[type]);
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
      oldData: oldData,
      category: type,
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
      setError(false);
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
          placeholder={placeholder[0]}
        ></input>
        <input
          required
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          placeholder={placeholder[1]}
        ></input>
        <input
          required
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder={placeholder[2]}
        ></input>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={placeholder[3]}
        ></textarea>
        {error &&
          "Some error occured, Maybe two devics are simultaneously editing"}
        <button action="submit" disabled={loading}>
          {edit ? "Edit" : "Add"}
        </button>
      </form>
      <button onClick={() => show(false)}>Close</button>
    </>
  );
}
