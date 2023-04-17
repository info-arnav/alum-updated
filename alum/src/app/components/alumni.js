import Logout from "../logout";

export default function Alumni({ path }) {
  return (
    <div className="nav-links">
      {[
        ["Home", "/"],
        ["Profile", "/profile"],
      ].map((e) => {
        return (
          <div
            key={e[0].toLowerCase()}
            className={`nav-sub-links ${
              e[1].toLowerCase() == path.toLowerCase() && "active"
            }`}
          >
            <Link href={e[1].toLowerCase()}>{e[0]}</Link>
          </div>
        );
      })}
      <button
        href="/login"
        className={`nav-sub-button`}
        onClick={(e) => {
          Logout();
        }}
      >
        <div>Logout</div>
      </button>
    </div>
  );
}
