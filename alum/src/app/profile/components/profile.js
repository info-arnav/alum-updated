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
          className="absolute left-1 md:left-8 -top-16 border-white border-8 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
        ></img>
        <div className="absolute left-[205px] md:left-64">
          <div className="flex flex-col text-left">
            <p className="m-1 mt-3 font-bold text-2xl">
              {data.name || 'Name Not Provided'}
            </p>
            <p className="m-1 font-semibold">
              {data.batch || 'Batch Not Provided'}
            </p>
            <p className="m-1 font-semibold text-[#7d7d7d]">{email}</p>
            <p
              className="m-1"
              dangerouslySetInnerHTML={{
                __html: data.bio || 'Bio Not Provided',
              }}
            ></p>
          </div>
        </div>
      </div>
    </>
  );
}
