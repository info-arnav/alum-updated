import Empty from '../empty';
import LoggedIn from '../loggedIn';

export const metadata = {
  title: 'Profile',
  description:
    'View and manage your Alum profile, showcasing your NSUT journey, accomplishments, and connections. Keep your information up-to-date and stay connected with fellow students and alumni.',
  openGraph: {
    title: 'Profile',
    description:
      'View and manage your Alum profile, showcasing your NSUT journey, accomplishments, and connections. Keep your information up-to-date and stay connected with fellow students and alumni.',
    url: `${process.env.LINK}profile`,
    siteName: 'Alum',
    images: [
      {
        url: `${process.env.LINK}logo-background.png`,
        width: 250,
        height: 250,
        alt: 'Alum - NSUT Alumni Network Logo',
      },
      {
        url: `${process.env.LINK}logo.png`,
        width: 250,
        height: 193,
        alt: 'Alum - NSUT Alumni Network Logo',
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    title: 'Profile',
    description:
      'View and manage your Alum profile, showcasing your NSUT journey, accomplishments, and connections. Keep your information up-to-date and stay connected with fellow students and alumni.',
    images: [
      `${process.env.LINK}logo-background.png`,
      `${process.env.LINK}logo.png`,
    ],
  },
};

export default function ProfileLayout({ children }) {
  const status = LoggedIn();
  if (status.loggedIn) {
    if (status.data.type != 'admin' && status.data.verified) {
      return <>{children}</>;
    } else {
      return <Empty link="/"></Empty>;
    }
  } else {
    return <Empty link="/login"></Empty>;
  }
}
