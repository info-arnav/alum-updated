import Link from "next/link";
import "./home.css";

export default function Home() {
  return (
    <main>
      <div className="banner">
        <div className="content">
          <div className="heading">ALUM</div>
          <div className="description">The NSUT networking site</div>
          <Link className="button" href="/register">
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
