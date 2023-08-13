"use client";

import Links from "./links";

export default function Student({ path, data, link }) {
  return (
    <Links
      links={[
        ["Home", "/"],
        ["Profile", "/profile"],
        ["Internships", "/recruitment"],
      ]}
      logout={true}
      path={path}
      data={data}
      link={link}
    ></Links>
  );
}
