import LoggedIn from "../loggedIn";
import UserData from "./userData";

export default function Profile() {
  const data = LoggedIn();
  return (
    <div className="profile-page">
      <UserData data={data} link={process.env.LINK}></UserData>
    </div>
  );
}
