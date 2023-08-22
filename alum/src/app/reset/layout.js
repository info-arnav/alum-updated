import Empty from "../empty";
import LoggedIn from "../loggedIn";

export const metadata = {
  title: "Reset",
  description:
    "Reset your Nalum account password and regain access to the NSUT community platform. Follow the instructions to securely reset your password and continue exploring networking opportunities, job offers, internships, mentorship, and more.",
  openGraph: {
    title: "Reset",
    description:
      "Reset your Nalum account password and regain access to the NSUT community platform. Follow the instructions to securely reset your password and continue exploring networking opportunities, job offers, internships, mentorship, and more.",
    url: `${process.env.LINK}reset`,
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
    title: "Reset",
    description:
      "Reset your Nalum account password and regain access to the NSUT community platform. Follow the instructions to securely reset your password and continue exploring networking opportunities, job offers, internships, mentorship, and more.",
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
