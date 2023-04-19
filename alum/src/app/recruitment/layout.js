import Empty from "../empty";
import LoggedIn from "../loggedIn";

const status = LoggedIn();

let description = (status.data.type = "student"
  ? "Explore inspiring stories of NSUT alumni who have made remarkable strides in their careers. Learn about their recruitment journeys, companies they've joined, and how they've utilized their NSUT education to excel professionally."
  : "Looking for a platform where NSUT alumni can easily manage their job recruitment requests? Check out our recruitment page on Alum, the alumni portal on NSUT! Here, alumni can view, edit, and delete all of their recruitment requests, as well as monitor their status. Join Alum today and take control of your career opportunities as an NSUT alumnus.");

export const metadata = {
  title: "View Recruitments",
  description: description,
  openGraph: {
    title: "View Recruitments",
    description: description,
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
    title: "View Recruitments",
    description: description,
    images: [
      `${process.env.LINK}logo-background.png`,
      `${process.env.LINK}logo.png`,
    ],
  },
};

export default function RecruitmentPage({ children }) {
  if (!status.loggedIn) {
    return (
      <>
        <Empty link="/"></Empty>
      </>
    );
  } else {
    if (status.data.type == "student" || status.data.type == "alumni") {
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
