import "./home.css";
import Admin from "./home/admin";
import Alumni from "./home/alumni";
import LoggedOut from "./home/loggedOut";
import Pending from "./home/pending";
import Student from "./home/student";
import LoggedIn from "./loggedIn";

export default function Home() {
  const status = LoggedIn();
  return (
    <div className="home-page">
      {status.loggedIn ? (
        status.data.verified ? (
          status.data.type == "student" ? (
            <Student></Student>
          ) : status.data.type == "alumni" ? (
            <Alumni></Alumni>
          ) : (
            <Admin></Admin>
          )
        ) : (
          <Pending data={status}></Pending>
        )
      ) : (
        <LoggedOut></LoggedOut>
      )}
    </div>
  );
}
