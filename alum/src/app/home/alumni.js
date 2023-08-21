import LoggedIn from "./loggedIn";

export default function Alumni({ keys, link, data }) {
  return (
    <LoggedIn type="alumni" keys={keys} link={link} data={data}></LoggedIn>
  );
}
