import Logout from "../logout";

export default function Alumni({ path }) {
  return (
    <div className="nav-links">
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
