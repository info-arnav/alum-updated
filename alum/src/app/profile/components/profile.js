export default function Profile({ data, email, link }) {
  return (
    <>
      <img
        src={`${link}api/image/${data._id}`}
        width={200}
        height={200}
        alt="The profile picture"
        id="profile_image_refreshed"
      ></img>
      <p>{data.name || "Name Not Provided"}</p>
      <p>{email}</p>
      <p>{data.batch || "Batch Not Provided"}</p>
      <p
        dangerouslySetInnerHTML={{ __html: data.bio || "Bio Not Provided" }}
      ></p>
    </>
  );
}
