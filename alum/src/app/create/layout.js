import Empty from "@/app/empty";
import LoggedIn from "@/app/loggedIn";

export const metadata = {
  title: "New Recruitment",
  description:
    "Are you an NSUT alum looking to recruit fellow graduates? Share your job openings and internship opportunities on our platform, fostering professional connections and enabling the growth of the NSUT alumni network.",
  openGraph: {
    title: "New Reruitment",
    description:
      "Are you an NSUT alum looking to recruit fellow graduates? Share your job openings and internship opportunities on our platform, fostering professional connections and enabling the growth of the NSUT alumni network.",
    url: `${process.env.LINK}create`,
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
    title: "New Reruitment",
    description:
      "Are you an NSUT alum looking to recruit fellow graduates? Share your job openings and internship opportunities on our platform, fostering professional connections and enabling the growth of the NSUT alumni network.",
    images: [
      `${process.env.LINK}logo-background.png`,
      `${process.env.LINK}logo.png`,
    ],
  },
};

export default function CreatePage({ children }) {
  const status = LoggedIn();
  if (!status.loggedIn) {
    return (
      <>
        <Empty link="/"></Empty>
      </>
    );
  } else {
    if (status.data.type == "alumni") {
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
