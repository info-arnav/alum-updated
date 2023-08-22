import Empty from "../empty";
import LoggedIn from "../loggedIn";

export const metadata = {
  title: "Login",
  description:
    "Log in to your Nalum account to connect with NSUT students and alumni, explore networking opportunities, find job offers, internships, and engage in mentorship within the NSUT community.",
  openGraph: {
    title: "Login",
    description:
      "Log in to your Nalum account to connect with NSUT students and alumni, explore networking opportunities, find job offers, internships, and engage in mentorship within the NSUT community.",
    url: `${process.env.LINK}login`,
    siteName: "Nalum",
    images: [
      {
        url: `${process.env.LINK}logo-background.png`,
        width: 250,
        height: 250,
        alt: "Nalum - NSUT Alumni Network Logo",
      },
      {
        url: `${process.env.LINK}logo.png`,
        width: 250,
        height: 193,
        alt: "Nalum - NSUT Alumni Network Logo",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    title: "Login",
    description:
      "Log in to your Nalum account to connect with NSUT students and alumni, explore networking opportunities, find job offers, internships, and engage in mentorship within the NSUT community.",
    images: [
      `${process.env.LINK}logo-background.png`,
      `${process.env.LINK}logo.png`,
    ],
  },
};

export default function LoginLayout({ children }) {
  const status = LoggedIn();
  if (status.loggedIn) {
    return (
      <>
        <Empty link="/"></Empty>
      </>
    );
  } else {
    return <>{children}</>;
  }
}
