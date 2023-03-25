"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
      <div className="nav-links">
        {[
          ["Home", "/"],
          ["About", "/about"],
          ["Register", "/register"],
        ].map((e) => {
          return (
            <div
              className={`nav-sub-links ${
                e[1].toLowerCase() == path.toLowerCase() && "active"
              } ${e[0] == "Register" && "small"}`}
            >
              <Link href={e[1].toLowerCase()}>{e[0]}</Link>
            </div>
          );
        })}
        <Link
          href="/login"
          className={`nav-sub-button ${
            path.toLowerCase() == "/login" && "active"
          }`}
        >
          <div>Login</div>
        </Link>
      </div>
    </nav>
  );
}
