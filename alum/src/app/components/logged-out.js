import Links from "./links";

export default function LoggedOut({ path }) {
  return (
    <Links
      links={[["Home", "/"]]}
      buttons={[
        ["Login", "/login"],
        ["Register", "/register"],
      ]}
      path={path}
    ></Links>
  );
}
