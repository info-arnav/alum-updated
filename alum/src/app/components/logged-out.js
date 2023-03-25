import Link from "next/link";

export default function LoggedOut({ path }) {
  return (
    <div className="nav-links">
      {[
        ["Home", "/"],
        ["About", "/about"],
        ["Register", "/register"],
      ].map((e) => {
        return (
          <div
            key={e[0].toLowerCase()}
            className={`nav-sub-links ${
              e[1].toLowerCase() == path.toLowerCase() && "active"
            } ${e[0] == "Register" && "small"}`}
          >
            <Link href={e[1].toLowerCase()}>{e[0]}</Link>
          </div>
        );
      })}
      <Link
        href="/login"
        className={`nav-sub-button ${
          path.toLowerCase() == "/login" && "active"
        }`}
      >
        <div>Login</div>
      </Link>
    </div>
  );
}
