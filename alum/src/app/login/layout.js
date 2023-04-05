import { redirect } from "next/navigation";
import LoggedIn from "../loggedIn";

export const metadata = {
  title: "Login",
  description:
    "Log in to your Alum account to connect with NSUT students and alumni, explore networking opportunities, find job offers, internships, and engage in mentorship within the NSUT community.",
  openGraph: {
    title: "Login",
    description:
      "Log in to your Alum account to connect with NSUT students and alumni, explore networking opportunities, find job offers, internships, and engage in mentorship within the NSUT community.",
    url: `${process.env.LINK}login`,
    siteName: "Alum",
    images: [
      {
        url: `${process.env.LINK}logo-background.png`,
        width: 250,
        height: 250,
        alt: "Alum - NSUT Alumni Network Logo",
      },
      {
        url: `${process.env.LINK}logo.png`,
        width: 250,
        height: 193,
        alt: "Alum - NSUT Alumni Network Logo",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    title: "Login",
    description:
      "Log in to your Alum account to connect with NSUT students and alumni, explore networking opportunities, find job offers, internships, and engage in mentorship within the NSUT community.",
    images: [`${process.env.LINK}logo.png`],
  },
};

export default function LoginLayout({ children }) {
  const status = LoggedIn();
  if (status.loggedIn) {
    return <div className="empty">{redirect("/")}</div>;
  } else {
    return <>{children}</>;
  }
}
