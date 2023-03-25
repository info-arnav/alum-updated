import Image from "next/image";
import "./globals.css";

export const metadata = {
  manifest: `${process.env.LINK}manifest.json`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <nav>
        <Image
          className="logo"
          src="/logo.png"
          width={30}
          height={30}
          alt="Logo of the Alum portal"
        ></Image>
        <div className="nav-title">ALUM</div>
        <div className="nav-links">
          <div className="nav-sub-links">Home</div>
          <div className="nav-sub-links">About</div>
          <div className="nav-sub-links">Register</div>
          <div className="nav-sub-button">Login</div>
        </div>
      </nav>
      <body>
        <main>{children}</main>
      </body>
      <footer></footer>
    </html>
  );
}
