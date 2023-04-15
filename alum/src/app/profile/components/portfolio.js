"use client";

export default function Portfolio({ data }) {
  return (
    <>
      Title
      {data.occupation.map((e) => {
        return <div key={e.index}>Edit delete Some occupation Data</div>;
      })}
      {data.education.map((e) => {
        return <div key={e.index}>Some Educational Data</div>;
      })}
      {data.projects.map((e) => {
        return <div key={e.index}>Some projects Data</div>;
      })}
      {data.honors.map((e) => {
        return <div key={e.index}>Some honors Data</div>;
      })}
      {data.applications.map((e) => {
        return <div key={e.index}>Some applications Data</div>;
      })}
    </>
  );
}

// //curl \
// -X GET \
// -H "Authorization: Bearer ${YOUR_API_KEY}" \
// https://nubela.co/proxycurl/api/v2/linkedin?url=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fjoho-balboa%2F&use_cache=if-present
