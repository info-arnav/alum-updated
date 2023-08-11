import LoggedIn from "@/app/loggedIn";
import Check from "./check";

export default function Profile({ params }) {
  const data = LoggedIn();
  return (
    <div className="profile-page">
      <Check id={params.id} link={process.env.LINK} data={data}></Check>
    </div>
  );
}
