import Link from "next/link";

export default function LoggedOut() {
  return (
    <main>
      <div className="banner">
        <div className="content-container">
          <div className="title">ALUM</div>
          <div className="content">The NSUT Networking Site</div>
          <Link href="/register">
            <div className="button">REGISTER NOW</div>
          </Link>
        </div>
      </div>
      <div className="block"></div>
    </main>
  );
}
