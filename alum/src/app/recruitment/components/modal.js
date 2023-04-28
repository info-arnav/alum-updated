"use client";

import { useState } from "react";

export default function Modal({
  type,
  data,
  email,
  mainData,
  updater,
  update,
  refresh,
  position,
}) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(type == "edit" ? data.title : "");
  const [company, setCompany] = useState(type == "edit" ? data.company : "");
  const [description, setDescription] = useState(
    type == "edit" ? data.description : ""
  );
  const [location, setLocation] = useState(type == "edit" ? data.location : "");
  const [duration, setDuration] = useState(type == "edit" ? data.duration : "");
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState(type == "edit" ? data.link : "");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (type == "edit") {
      await fetch("/api/edit-recruitments", {
        method: "POST",
        body: JSON.stringify({
          id: data._id,
          email: email,
          title: title,
          company: company,
          description: description,
          location: location,
          duration: duration,
          link: link,
        }),
      }).then((e) => e.json());
      mainData[position] = {
        title: title,
        company: company,
        description: description,
        location: location,
        duration: duration,
        link: link,
      };
      updater(mainData);
      update(!refresh);
      setTitle("");
      setCompany("");
      setDescription("");
      setLink("");
      setShow(false);
      setLoading(false);
    } else {
      await fetch("/api/create-recruitment", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          title: title,
          company: company,
          description: description,
          location: location,
          duration: duration,
          link: link,
        }),
      }).then((e) => e.json());
      mainData.push({
        email: email,
        title: title,
        company: company,
        description: description,
        location: location,
        duration: duration,
        link: link,
      });
      updater(mainData);
      update(!refresh);
      setTitle("");
      setCompany("");
      setDescription("");
      setLink("");
      setShow(false);
      setLoading(false);
    }
  };
  return (
    <>
      <button
        onClick={() => setShow(true)}
        className={type != "edit" && "main-button"}
      >
        {type == "edit" ? "Edit" : "New Post"}
      </button>
      {show && (
        <div className="modal">
          <form onSubmit={handleSubmit}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Position"
              required
            ></input>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company"
              required
            ></input>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="location"
              required
            ></input>
            <input
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="duration"
              required
            ></input>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrption"
              required
            ></textarea>
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Website link if any"
            ></input>
            <button type="submit" disabled={loading}>
              Save Changes
            </button>
          </form>
          <button onClick={() => setShow(false)}>Close</button>
        </div>
      )}
    </>
  );
}
