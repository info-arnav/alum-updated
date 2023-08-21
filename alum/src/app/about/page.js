import LoggedIn from "../loggedIn";
import Alum from "./alum";

export default function About() {
  const status = LoggedIn();
  return <Alum logged={status.loggedIn}></Alum>;
}
