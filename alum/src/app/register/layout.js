import Empty from "../empty";
import LoggedIn from "../loggedIn";

export const metadata = {
  title: "Register",
  description:
    "Join Nalum, the NSUT community platform, by registering as a student or alumnus. Create an account to access networking opportunities, job offers, internships, mentorship, and more.",
  openGraph: {
    title: "Register",
    description:
      "Join Nalum, the NSUT community platform, by registering as a student or alumnus. Create an account to access networking opportunities, job offers, internships, mentorship, and more.",
    url: `${process.env.LINK}register`,
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
    title: "Register",
    description:
      "Join Nalum, the NSUT community platform, by registering as a student or alumnus. Create an account to access networking opportunities, job offers, internships, mentorship, and more.",
    images: [
      `${process.env.LINK}logo-background.png`,
      `${process.env.LINK}logo.png`,
    ],
  },
};

export default function RegisterLayout({ children }) {
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
