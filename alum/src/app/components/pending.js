import Link from "next/link";

export default function Pending({ path }) {
  return (
    <div className="nav-links">
      {[["Home", "/"]].map((e) => {
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
    </div>
  );
}
