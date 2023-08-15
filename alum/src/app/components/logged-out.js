import Links from "./links";

export default function LoggedOut({ path }) {
  return (
    <Links
      links={[
        ["Home", "/"],
        ["Register", "/register"],
        ["Login", "/login"],
      ]}
      path={path}
    ></Links>
  );
}
