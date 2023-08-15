import LoggedIn from "@/app/loggedIn";
import Applicants from "./applicants";

export default function Status({ params }) {
  const data = LoggedIn();

  return (
    <>
      <Applicants
        email={data.data.email}
        id={params.id}
        link={process.env.LINK}
      ></Applicants>
    </>
  );
}
