import { redirect } from "next/navigation";
import LoggedIn from "../loggedIn";

export const metadata = {
  title: "Register",
  description: "Register here to be able to get access to the site Alum.",
  openGraph: {
    title: "Register",
    description: "Register here to be able to get access to the site Alum.",
    url: `${process.env.LINK}register`,
    siteName: "Alum",
    images: [
      {
        url: `${process.env.LINK}logo-background.png`,
        width: 250,
        height: 250,
        alt: "Logo of the site Alum",
      },
      {
        url: `${process.env.LINK}logo.png`,
        width: 250,
        height: 193,
        alt: "Logo of the site Alum",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    title: "Register",
    description: "Register here to be able to get access to the site Alum.",
    images: [`${process.env.LINK}logo.png`],
  },
};

export default function RootLayout({ children }) {
  const status = LoggedIn();
  if (status.loggedIn) {
    return <div className="empty">{redirect("/")}</div>;
  } else {
    return <>{children}</>;
  }
}
