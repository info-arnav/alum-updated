"use client";

import { useEffect, useState } from "react";

export default function EditPortfolio({ data, link, email }) {
  const [show, setShow] = useState(false);
  useEffect(() => {});
  return (
    <>
      <input value={`${link}api/image/${email}`}></input>
      {show && <></>}
    </>
  );
}
