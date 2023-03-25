import "./globals.css";
import "./responsive.css";
import LoggedIn from "./loggedIn";
import Navigation from "./navigation";
import Footer from "./footer";

export const metadata = {
  manifest: `${process.env.LINK}manifest.json`,
};

export default function RootLayout({ children }) {
  const status = LoggedIn();
  return (
    <html lang="en">
      <head />
      <Navigation data={status}></Navigation>
      <main>{children}</main>
      <Footer></Footer>
    </html>
  );
}
