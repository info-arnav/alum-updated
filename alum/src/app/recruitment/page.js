import LoggedIn from "../loggedIn";
import DataFetch from "./dataFetch";
import FetchRecruitments from "./fetchRecruitments";

export default function Recruitment() {
  const data = LoggedIn();
  if (data.data.type == "alumni") {
    return <DataFetch email={data.data.email}></DataFetch>;
  } else {
    return <FetchRecruitments email={data.data.email}></FetchRecruitments>;
  }
}
