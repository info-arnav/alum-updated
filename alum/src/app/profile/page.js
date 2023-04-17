import LoggedIn from "../loggedIn";
import UserProfile from "./userProfile";
import "./profile.css";

export default function Profile() {
  const data = LoggedIn();
  return (
    <div className="profile-page">
      <UserProfile data={data} link={process.env.LINK}></UserProfile>
    </div>
  );
}
