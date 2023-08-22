import Empty from "@/app/empty";
import LoggedIn from "@/app/loggedIn";

const fetchData = async (id) => {
  const res = await fetch(`${process.env.LINK}api/get-meta-data`, {
    method: "POST",
    body: JSON.stringify({
      id: id,
    }),
    cache: "no-cache",
  }).then((e) => e.json());
  return {
    name: res.data.name,
    verified: res.data.verified,
    type: res.data.type,
  };
};

export async function generateMetadata({ params }) {
  const data = await fetchData(params.id);
  return {
    title: data.name
      ? data.name[0].toUpperCase() + data.name.slice(1)
      : "Profile",
    description:
      "Discover and explore the profiles of NSUT alumni and students on Nalum - the premier networking platform for connecting with the university's community. View academic and professional information, skills, and interests to build meaningful connections and collaborations.",
    openGraph: {
      title: data.name
        ? data.name[0].toUpperCase() + data.name.slice(1)
        : "Profile",
      description:
        "Discover and explore the profiles of NSUT alumni and students on Nalum - the premier networking platform for connecting with the university's community. View academic and professional information, skills, and interests to build meaningful connections and collaborations.",
      url: `${process.env.LINK}view/profile/${params.id}`,
      siteName: "Nalum",
      images: [
        {
          url: `${process.env.LINK}api/image/${params.id}`,
          alt: `Profile picture of ${
            data.name
              ? data.name[0].toUpperCase() + data.name.slice(1)
              : "Some Unnamed User"
          }`,
        },
      ],
      locale: "en-US",
      type: "website",
    },
    twitter: {
      title: data.name
        ? data.name[0].toUpperCase() + data.name.slice(1)
        : "Profile",
      description:
        "Discover and explore the profiles of NSUT alumni and students on Nalum - the premier networking platform for connecting with the university's community. View academic and professional information, skills, and interests to build meaningful connections and collaborations.",
      images: [`${process.env.LINK}api/image/${params.id}`],
    },
  };
}

export default async function ProfileLayout({ children, params }) {
  const data = await fetchData(params.id);
  const status = LoggedIn();
  if (status.loggedIn) {
    if (
      (data.type != "student" &&
        data.type != "alumni" &&
        data.type != "admin") ||
      !status.data.verified
    ) {
      return <Empty link="/"></Empty>;
    } else {
      return <>{children}</>;
    }
  } else {
    return <Empty link="/login"></Empty>;
  }
}
