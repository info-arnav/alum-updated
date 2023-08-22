import Empty from "@/app/empty";
import LoggedIn from "@/app/loggedIn";

const fetchData = async (id) => {
  const res = await fetch(`${process.env.LINK}api/get-post-meta-data`, {
    method: "POST",
    body: JSON.stringify({
      id: id,
    }),
    cache: "no-cache",
  }).then((e) => e.json());
  return {
    title: res.data.title,
    comapny: res.data.company,
  };
};

export async function generateMetadata({ params }) {
  const data = await fetchData(params.id);
  return {
    title:
      data.title && data.comapny
        ? "Status" + " " + data.comapny + "-" + data.title
        : "Recruitment Status",
    description:
      "Discover top talent for your internship program on Nalum, the official alumni portal of NSUT. Engage with a pool of skilled applicants as you browse through their profiles and qualifications. Enhance your recruitment strategy with our powerful platform designed to connect you with talented NSUT alumni seeking valuable internship opportunities. Start building meaningful professional relationships today!",
    openGraph: {
      title:
        data.title && data.comapny
          ? "Status" + " " + data.comapny + "-" + data.title
          : "Recruitment Status",
      description:
        "Discover top talent for your internship program on Nalum, the official alumni portal of NSUT. Engage with a pool of skilled applicants as you browse through their profiles and qualifications. Enhance your recruitment strategy with our powerful platform designed to connect you with talented NSUT alumni seeking valuable internship opportunities. Start building meaningful professional relationships today!",
      url: `${process.env.LINK}view/status/${params.id}`,
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
      title:
        data.title && data.comapny
          ? "Status" + " " + data.comapny + "-" + data.title
          : "Recruitment Status",
      description:
        "Discover top talent for your internship program on Nalum, the official alumni portal of NSUT. Engage with a pool of skilled applicants as you browse through their profiles and qualifications. Enhance your recruitment strategy with our powerful platform designed to connect you with talented NSUT alumni seeking valuable internship opportunities. Start building meaningful professional relationships today!",
      images: [
        `${process.env.LINK}logo-background.png`,
        `${process.env.LINK}logo.png`,
      ],
    },
  };
}

export default async function RecruitmentStatusLayout({ children }) {
  const status = LoggedIn();
  if (status.loggedIn) {
    if (status.data.type != "alumni" || !status.data.verified) {
      return <Empty link="/"></Empty>;
    } else {
      return <>{children}</>;
    }
  } else {
    return <Empty link="/login"></Empty>;
  }
}
