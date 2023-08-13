import Links from "./links";

export default function Alumni({ path }) {
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
    ></Links>
  );
}
