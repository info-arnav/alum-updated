"use client";

import { useState } from "react";

export default function Recruitment() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <input
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        ></input>
        <input
          placeholder="Company URL"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        ></input>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit">Post</button>
      </form>
    </>
  );
}

// {
//   "title": "recruitment",
//   "properties": {
//     "title": {
//       "bsonType": "string"
//     },
//     "description": {
//       "bsonType": "string"
//     },
//     "link": {
//       "bsonType": "string"
//     },
//     "company": {
//       "bsonType": "string"
//     },
//     "postedBy": {
//       "bsonType": "string"
//     },
//     "date": {
//       "bsonType": "string"
//     },
//     "applicants": {
//       "bsonType": "string"
//     }
//   }
// }
