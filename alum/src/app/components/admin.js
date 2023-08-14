import Links from "./links";

export default function Admin({ path, data, link }) {
  return (
    <Links
      links={[["Home", "/"]]}
      logout={true}
      path={path}
      data={{ id: "pending" }}
      link={link}
    ></Links>
  );
}
