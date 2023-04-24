import LoggedIn from "@/app/loggedIn";
import FetchData from "./fetchData";

export default function Recruitment({ params }) {
  const data = LoggedIn();
  return (
    <>
      <FetchData data={data} id={params.id}></FetchData>
    </>
  );
}
