import { redirect } from "next/navigation";
import LoggedIn from "../loggedIn";

export const metadata = {
  title: "Login",
  description:
    "Login here to get access to all the features of the Alum application.",
  openGraph: {
    title: "Login",
    description:
      "Login here to get access to all the features of the Alum application.",
    url: `${process.env.LINK}login`,
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
    title: "Login",
    description:
      "Login here to get access to all the features of the Alum application.",
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
