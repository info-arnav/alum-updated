import LoggedIn from "@/app/loggedIn";
import UserProfile from "./userProfile";

export default function Profile({ params }) {
  const data = LoggedIn();
  return (
    <div className="profile-page">
      <UserProfile
        id={params.id}
        link={process.env.LINK}
        data={data}
      ></UserProfile>
    </div>
  );
}
