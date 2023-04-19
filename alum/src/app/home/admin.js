import Requests from "./requests";

export default function Admin({ data }) {
  return <Requests status={data}></Requests>;
}
