import Empty from "@/app/empty";
import LoggedIn from "@/app/loggedIn";

export const metadata = {
  title: "Edit Recruitment",
  description:
    "Efficiently manage your recruitment posts on Alum, the NSUT alumni portal. Edit and update job opportunities to attract the right talent and ensure a seamless hiring experience.",
  openGraph: {
    title: "Edit Reruitment",
    description:
      "Efficiently manage your recruitment posts on Alum, the NSUT alumni portal. Edit and update job opportunities to attract the right talent and ensure a seamless hiring experience.",
    url: `${process.env.LINK}edit`,
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
    title: "Edit Reruitment",
    description:
      "Efficiently manage your recruitment posts on Alum, the NSUT alumni portal. Edit and update job opportunities to attract the right talent and ensure a seamless hiring experience.",
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
