import Admin from "./home/admin";
import Alumni from "./home/alumni";
import LoggedOut from "./home/loggedOut";
import Pending from "./home/pending";
import Student from "./home/student";
import LoggedIn from "./loggedIn";

export default function Home() {
  const status = LoggedIn();
  return (
    <div className="home-page" style={{ minHeight: "calc(100vh - 80px)" }}>
      {status.loggedIn ? (
        status.data.verified ? (
          status.data.type == "student" ? (
            <Student
              link={process.env.LINK}
              keys={[process.env.ALGOLIA_MAIN, process.env.ALGOLIA_SEARCH]}
              data={status}
            ></Student>
          ) : status.data.type == "alumni" ? (
            <Alumni
              link={process.env.LINK}
              keys={[process.env.ALGOLIA_MAIN, process.env.ALGOLIA_SEARCH]}
              data={status}
            ></Alumni>
          ) : (
            <Admin data={status}></Admin>
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
