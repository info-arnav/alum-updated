import { useState } from "react";

export default function Delete({
  position,
  type,
  data,
  refresh,
  setRefresh,
  setData,
  email,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    let updatedData = data[type];
    let oldData = JSON.stringify(data[type]);
    updatedData.splice(position, 1);
    data[type] = updatedData;
    let bodyData = {
      email: email,
      oldData: oldData,
      category: type,
    };
    bodyData[type] = JSON.stringify(updatedData);
    let res = await fetch(`/api/edit-portfolio-item`, {
      method: "POST",
      body: JSON.stringify(bodyData),
      cache: "no-cache",
    }).then((e) => e.json());
    if (res.error) {
      setError(true);
    } else {
      setData(data);
      setLoading(false);
      setRefresh(!refresh);
    }
  };
  return (
    <>
      <button onClick={handleSubmit} disabled={loading}>
        Delete
      </button>
      {error &&
        "Some error occured, maybe two devices are editing simultaneously"}
    </>
  );
}
