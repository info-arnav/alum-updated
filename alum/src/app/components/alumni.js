import Links from "./links";

export default function Alumni({ path, data, link }) {
  return (
    <Links
      links={[
        ["Home", "/"],
        ["Profile", "/profile"],
        ["Internships", "/recruitment"],
        ["Recruitments", "/candidates"],
      ]}
      logout={true}
      path={path}
      link={link}
      data={data}
    ></Links>
  );
}
