import Empty from "../empty";
import LoggedIn from "../loggedIn";

export async function metadata() {
  const status = LoggedIn();
  let description = status.loggedIn
    ? "Explore exciting job opportunities on Nalum, the NSUT alumni portal. Browse and apply for positions posted by esteemed alumni, and kickstart your career with valuable connections in your professional network."
    : "Unlock your career potential with Nalum, the NSUT alumni portal. Log in to explore job opportunities posted by alumni, apply for positions, and connect with professionals to boost your career growth and network.";
  return {
    title: "View History",
    description: description,
    openGraph: {
      title: "View History",
      description: description,
      url: `${process.env.LINK}candidates`,
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
      title: "View History",
      description: description,
      images: [
        `${process.env.LINK}logo-background.png`,
        `${process.env.LINK}logo.png`,
      ],
    },
  };
}

export default function RecruitmentPage({ children }) {
  const status = LoggedIn();
  if (!status.loggedIn) {
    return (
      <>
        <Empty link="/login"></Empty>
      </>
    );
  } else {
    if (status.data.type == "alumni" && status.data.verified) {
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
