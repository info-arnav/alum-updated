export const metadata = {
  title: "Privacy Policy",
  description:
    "Review Nalum's Privacy Policy to understand how we collect, use, and protect your personal information while providing a secure platform for NSUT alumni and students to connect, collaborate, and access opportunities.",
  openGraph: {
    title: "Privacy Policy",
    description:
      "Review Nalum's Privacy Policy to understand how we collect, use, and protect your personal information while providing a secure platform for NSUT alumni and students to connect, collaborate, and access opportunities.",
    url: `${process.env.LINK}privacy-policy`,
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
    title: "Privacy Policy",
    description:
      "Review Nalum's Privacy Policy to understand how we collect, use, and protect your personal information while providing a secure platform for NSUT alumni and students to connect, collaborate, and access opportunities.",
    images: [
      `${process.env.LINK}logo-background.png`,
      `${process.env.LINK}logo.png`,
    ],
  },
};

export default function PrivacyLayout({ children }) {
  return <>{children}</>;
}
