import Empty from "../empty";
import LoggedIn from "../loggedIn";

export const metadata = {
  title: "View Recruitment",
  description:
    "Explore inspiring stories of NSUT alumni who have made remarkable strides in their careers. Learn about their recruitment journeys, companies they've joined, and how they've utilized their NSUT education to excel professionally.",
  openGraph: {
    title: "View Recruitment",
    description:
      "Explore inspiring stories of NSUT alumni who have made remarkable strides in their careers. Learn about their recruitment journeys, companies they've joined, and how they've utilized their NSUT education to excel professionally.",
    url: `${process.env.LINK}recruitment`,
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
    title: "View Recruitment",
    description:
      "Explore inspiring stories of NSUT alumni who have made remarkable strides in their careers. Learn about their recruitment journeys, companies they've joined, and how they've utilized their NSUT education to excel professionally.",
    images: [
      `${process.env.LINK}logo-background.png`,
      `${process.env.LINK}logo.png`,
    ],
  },
};

export default function RecruitmentPage({ children }) {
  const status = LoggedIn();
  if (!status.loggedIn) {
    return (
      <>
        <Empty link="/"></Empty>
      </>
    );
  } else {
    if (status.data.type == "student") {
      return <>{children}</>;
    } else {
      return (
        <>
          <Empty link="/"></Empty>
        </>
      );
    }
  }
}
