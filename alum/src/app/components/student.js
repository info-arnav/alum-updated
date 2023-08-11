"use client";

import Links from "./links";

export default function Student({ path }) {
  return (
    <Links
      links={[
        ["Home", "/"],
        ["Profile", "/profile"],
        ["Internships", "/recruitment"],
      ]}
      logout={true}
      path={path}
    ></Links>
  );
}
