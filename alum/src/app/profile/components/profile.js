export default function Profile({ data, email, link }) {
  return (
    <>
      <img
        src={`${link}api/image/${email}`}
        width={100}
        height={100}
        alt="The profile picture"
        id="profile_image_refreshed"
      ></img>
      {data.name || "Name Not Provided"}
      {email}
      {data.batch || "Batch Not Provided"}
      {data.bio || "Bio Not Provided"}
    </>
  );
}
