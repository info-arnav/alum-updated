export default function Profile({ data, email, link }) {
  return (
    <>
      <div className="">
        <img
          src={`${link}api/image/${data._id}`}
          width={200}
          height={200}
          alt="The profile picture"
          id="profile_image_refreshed"
          className="absolute m-auto md:m-0 left-0 right-0 md:left-8 -top-16 border-white border-8 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-[150px] h-[150px] md:w-[200px] md:h-[200px]"
        ></img>
        <div className="md:absolute md:left-64 pt-[90px] m-2 md:p-0">
          <div className="flex flex-col md:text-left text-center">
            <p className="m-1 mt-3 font-bold text-2xl">
              {data.name || "Name Not Provided"}
            </p>
            <p className="m-1 font-semibold">
              {data.batch || "Batch Not Provided"}
            </p>
            <p className="m-1 font-semibold text-[#7d7d7d]">{email}</p>
            <p
              className="m-1"
              dangerouslySetInnerHTML={{
                __html: data.bio || "Bio Not Provided",
              }}
            ></p>
          </div>
        </div>
      </div>
    </>
  );
}
