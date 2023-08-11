import Links from "./links";

export default function LoggedOut({ path }) {
  return (
    <Links
      links={[
        ["Home", "/"],
        // ["About", "/about"],
        ["Register", "/register"],
        ["Login", "/login"],
      ]}
      path={path}
    ></Links>
  );
}
