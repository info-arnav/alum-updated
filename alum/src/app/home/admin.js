import Requests from "./requests";

export default function Admin({ data }) {
  return (
    <main className="background">
      <Requests status={data}></Requests>
    </main>
  );
}
