export const metadata = {
  title: "About",
  description:
    "Welcome to Nalum, the exclusive platform connecting NSUT students and alumni. Discover networking opportunities, mentorship, job offers, internships, and more while staying engaged with the NSUT community.",
  openGraph: {
    title: "About",
    description:
      "Welcome to Nalum, the exclusive platform connecting NSUT students and alumni. Discover networking opportunities, mentorship, job offers, internships, and more while staying engaged with the NSUT community.",
    url: `${process.env.LINK}about`,
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
    title: "About",
    description:
      "Welcome to Nalum, the exclusive platform connecting NSUT students and alumni. Discover networking opportunities, mentorship, job offers, internships, and more while staying engaged with the NSUT community.",
    images: [
      `${process.env.LINK}logo-background.png`,
      `${process.env.LINK}logo.png`,
    ],
  },
};

export default function AboutLayout({ children }) {
  return <>{children}</>;
}
