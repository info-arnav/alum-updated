"use client";

import { useState } from "react";

export default function Modal({ type, data, email }) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(type == "edit" ? data.title : "");
  const [company, setCompany] = useState(type == "edit" ? data.company : "");
  const [description, setDescription] = useState(
    type == "edit" ? data.description : ""
  );
  const [link, setLink] = useState(type == "edit" ? data.link : "");
  return (
    <>
      <button onClick={() => setShow(true)}>
        {type == "edit" ? "Edit" : "New Post"}
      </button>
      {show && (
        <>
          <form>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            ></input>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></input>
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
            ></input>
            <button>Save Changed</button>
          </form>
          <button onClick={() => setShow(false)}>Close</button>
        </>
      )}
    </>
  );
}
