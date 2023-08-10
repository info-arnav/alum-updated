"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Admin from "./components/admin";
import Alumni from "./components/alumni";
import LoggedOut from "./components/logged-out";
import Pending from "./components/pending";
import Student from "./components/student";

export default function Navigation({ data }) {
  let path = usePathname().toLowerCase();
  return (
    <nav>
      <a href="/" className="nav-image-link">
        <Image
          className="logo"
          src="/logo.png"
          width={40}
          height={40}
          alt="Logo of the Alum portal"
        ></Image>
      </a>
      <a href="/">
        <div className="nav-title">Alum</div>
      </a>
      {data.loggedIn ? (
        data.data.verified ? (
          data.data.type == "student" ? (
            <Student path={path}></Student>
          ) : data.data.type == "alumni" ? (
            <Alumni path={path}></Alumni>
          ) : (
            <Admin path={path}></Admin>
          )
        ) : (
          <Pending path={path}></Pending>
        )
      ) : (
        <LoggedOut path={path}></LoggedOut>
      )}
    </nav>
  );
}
