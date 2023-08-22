import Empty from "@/app/empty";
import LoggedIn from "@/app/loggedIn";

const fetchData = async (id) => {
  const res = await fetch(
    `${process.env.LINK}api/get-recruited-post-meta-data`,
    {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
      cache: "no-cache",
    }
  ).then((e) => e.json());
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
        ? "History" + " " + data.comapny + "-" + data.title
        : "Recruitment History",
    description:
      "Explore Exceptional Internship Candidates on Nalum, the official NSUT alumni portal. Uncover a treasure trove of skilled applicants as you navigate through their profiles and qualifications. Elevate your recruitment approach using our robust platform, meticulously designed to link you with accomplished NSUT alumni actively seeking enriching internship experiences. Begin forging impactful professional connections today!",
    openGraph: {
      title:
        data.title && data.comapny
          ? "History" + " " + data.comapny + "-" + data.title
          : "Recruitment History",
      description:
        "Explore Exceptional Internship Candidates on Nalum, the official NSUT alumni portal. Uncover a treasure trove of skilled applicants as you navigate through their profiles and qualifications. Elevate your recruitment approach using our robust platform, meticulously designed to link you with accomplished NSUT alumni actively seeking enriching internship experiences. Begin forging impactful professional connections today!",
      url: `${process.env.LINK}view/recruited/${params.id}`,
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
          ? "History" + " " + data.comapny + "-" + data.title
          : "Recruitment History",
      description:
        "Explore Exceptional Internship Candidates on Nalum, the official NSUT alumni portal. Uncover a treasure trove of skilled applicants as you navigate through their profiles and qualifications. Elevate your recruitment approach using our robust platform, meticulously designed to link you with accomplished NSUT alumni actively seeking enriching internship experiences. Begin forging impactful professional connections today!",
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
