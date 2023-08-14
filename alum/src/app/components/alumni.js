import Links from "./links";

export default function Alumni({ path, data, link }) {
  return (
    <Links
      links={[
        ["Home", "/"],
        ["Profile", "/profile"],
        ["Manage", "/recruitment"],
        ["History", "/candidates"],
      ]}
      logout={true}
      path={path}
      link={link}
      data={data}
    ></Links>
  );
}
