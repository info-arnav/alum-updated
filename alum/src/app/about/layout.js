export const metadata = {
  title: "About",
  description:
    "Alum is NSUT's Aumni web portal to connect the students and alumni.",
  openGraph: {
    title: "About",
    description:
      "Alum is NSUT's Aumni web portal to connect the students and alumni.",
    url: `${process.env.LINK}about`,
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
    title: "About",
    description:
      "Alum is NSUT's Aumni web portal to connect the students and alumni.",
    images: [`${process.env.LINK}logo.png`],
  },
};

export default function RootLayout({ children }) {
  return <>{children}</>;
}
