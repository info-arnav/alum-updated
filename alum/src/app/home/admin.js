import Requests from "./requests";

export default function Admin({ data }) {
  return (
    <>
      <center
        style={{
          marginTop: 30,
          marginBottom: 30,
          fontWeight: "bold",
          fontSize: 25,
        }}
      >
        <p>Requests</p>
      </center>
      <Requests status={data}></Requests>
    </>
  );
}
