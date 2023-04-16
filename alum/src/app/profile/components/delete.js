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
  const handleSubmit = async () => {
    setLoading(true);
    let updatedData = data[type];
    updatedData.splice(position, 1);
    data[type] = updatedData;
    let bodyData = { email: email };
    bodyData[type] = JSON.stringify(updatedData);
    await fetch(`/api/edit-portfolio-item`, {
      method: "POST",
      body: JSON.stringify(bodyData),
      cache: "no-cache",
    });
    setData(data);
    setLoading(false);
    setRefresh(!refresh);
  };
  return (
    <button onClick={handleSubmit} disabled={loading}>
      Delete
    </button>
  );
}
