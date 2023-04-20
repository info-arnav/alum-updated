import LoggedIn from "../loggedIn";
import DataFetch from "./dataFetch";

export default function Recruitment() {
  const data = LoggedIn();
  return <DataFetch email={data.data.email}></DataFetch>;
}
