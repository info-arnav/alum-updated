import LoggedIn from "./loggedIn";

export default function Student({ keys, link, data }) {
  return (
    <LoggedIn type="student" keys={keys} link={link} data={data}></LoggedIn>
  );
}
