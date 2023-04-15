"use client";

import { useEffect, useState } from "react";

export default function EditProfile({ data, link, email }) {
  const [show, setShow] = useState(false);
  const handleUpdate = async () => {};
  return (
    <>
      <button onClick={() => setShow(true)}>Edit Profile</button>
      <br></br>
      {show && (
        <>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setShow(false)}>Close</button>
        </>
      )}
    </>
  );
}
