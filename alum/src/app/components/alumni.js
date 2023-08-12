import Links from "./links";

export default function Alumni({ path }) {
  return (
    <Links
      links={[
        ["Home", "/"],
        ["Profile", "/profile"],
        ["Internships", "/recruitment"],
        ["Candidates", "/candidates"],
      ]}
      logout={true}
      path={path}
    ></Links>
  );
}
