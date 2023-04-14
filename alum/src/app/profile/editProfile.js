"use client";

import { useEffect } from "react";

export default function EditProfile({ data, link, email }) {
  useEffect(() => {});
  return (
    <>
      <input value={`${link}api/image/${email}`}></input>
    </>
  );
}
