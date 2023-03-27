import Link from "next/link";
import "./home.css";

export default function Home() {
  return (
    <main>
      <div className="banner">
        <div className="banner-overlay">
          <div className="title">Alum</div>
          <div className="description">
            Welcome to the NSUT Alumni Portal, your gateway to reconnecting with
            your alma mater and fellow graduates, staying up-to-date on the
            latest news and events, and accessing valuable career resources and
            networking opportunities.
          </div>
          <Link className="button" href="/register">
            Register Now
          </Link>
        </div>
      </div>
    </main>
  );
}
