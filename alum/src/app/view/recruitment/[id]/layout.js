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
        ? data.title + "-" + data.comapny
        : "Recruitment Opening",
    description:
      "Looking for an exciting career opportunity? Check out the latest recruitment post by NSUT alumni on the Alum portal! Get all the details you need to know, including job requirements and application procedures, to take the first step towards your dream job. Don't miss out on this chance to kickstart your career with the help of experienced NSUT alumni. Visit the portal now!",
    openGraph: {
      title:
        data.title && data.comapny
          ? data.title + "-" + data.comapny
          : "Recruitment Opening",
      description:
        "Looking for an exciting career opportunity? Check out the latest recruitment post by NSUT alumni on the Alum portal! Get all the details you need to know, including job requirements and application procedures, to take the first step towards your dream job. Don't miss out on this chance to kickstart your career with the help of experienced NSUT alumni. Visit the portal now!",
      url: `${process.env.LINK}view/recruitment/${params.id}`,
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
      title:
        data.title && data.comapny
          ? data.title + "-" + data.comapny
          : "Recruitment Opening",
      description:
        "Looking for an exciting career opportunity? Check out the latest recruitment post by NSUT alumni on the Alum portal! Get all the details you need to know, including job requirements and application procedures, to take the first step towards your dream job. Don't miss out on this chance to kickstart your career with the help of experienced NSUT alumni. Visit the portal now!",
      images: [
        `${process.env.LINK}logo-background.png`,
        `${process.env.LINK}logo.png`,
      ],
    },
  };
}

export default async function RecruitmentLayout({ children }) {
  const status = LoggedIn();
  if (status.loggedIn) {
    if (status.data.type != "student" || !status.data.verified) {
      return <Empty link="/"></Empty>;
    } else {
      return <>{children}</>;
    }
  } else {
    return <Empty link="/login"></Empty>;
  }
}
