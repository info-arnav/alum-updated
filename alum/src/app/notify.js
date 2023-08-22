"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Notify({ message }) {
  const [show, setShow] = useState(true);
  useEffect(() => {
    setTimeout(() => setShow(false), 2000);
  }, []);
  return (
    show && (
      <div className="notification-box">
        <header>
          <Image src="/logo.png" height="20" width="20"></Image>
          <div className="title">Nalum</div>
        </header>
        <hr></hr>
        <div className="content">{message}</div>
      </div>
    )
  );
}
