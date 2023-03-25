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
      <Image
        className="logo"
        src="/logo.png"
        width={30}
        height={30}
        alt="Logo of the Alum portal"
      ></Image>
      <div className="nav-title">ALUM</div>
      {data.loggedIn ? (
        data.data.verified ? (
          data.data.type == "student" ? (
            <Student></Student>
          ) : data.data.type == "alumni" ? (
            <Alumni></Alumni>
          ) : (
            <Admin></Admin>
          )
        ) : (
          <Pending></Pending>
        )
      ) : (
        <LoggedOut path={path}></LoggedOut>
      )}
    </nav>
  );
}
