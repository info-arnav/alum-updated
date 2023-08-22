"use client";

import Image from "next/image";

export default function UpdateNotification() {
  return (
    <div className="notification-box">
      <header>
        <Image src="/logo.png" height="20" width="20"></Image>
        <div className="title">Nalum</div>
      </header>
      <hr></hr>
      <div className="content">
        Update on your profile available.
        <div className="refresh" onClick={() => location.reload()}>
          {"Refresh Now."}
        </div>
      </div>
    </div>
  );
}
