"use client";

import { useState } from "react";

export default function EditProfile({ data, link, email }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState(data.name);
  const [image, setImage] = useState(`${link}api/image/${email}`);
  const [batch, setBatch] = useState(data.batch);
  const [bio, setBio] = useState(data.bio);
  const handleUpdate = async (e) => {
    e.preventDefault();
  };
  return (
    <>
      <button onClick={() => setShow(true)}>Edit Profile</button>
      <br></br>
      {show && (
        <>
          <form action={handleUpdate}>
            <img
              src={image}
              alt="The profile picture"
              width={100}
              height={100}
            ></img>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <input
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
            ></input>
            <input value={bio} onChange={(e) => setBio(e.target.value)}></input>
            <button onClick={handleUpdate} type="submit">
              Update
            </button>
          </form>
          <button onClick={() => setShow(false)}>Close</button>
        </>
      )}
    </>
  );
}
