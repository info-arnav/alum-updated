"use client";
export default function Delete({
  updater,
  position,
  refresh,
  update,
  data,
  index,
  email,
}) {
  const deleteData = async () => {
    data.splice(position, 1);
    await fetch("/api/delete-recruitment", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        id: index,
      }),
    }).then((e) => e.json());
    updater(data);
    update(!refresh);
  };
  return <button onClick={deleteData}>Delete</button>;
}
