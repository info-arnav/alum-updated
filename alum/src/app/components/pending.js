import Links from "./links";

export default function Pending({ path }) {
  return <Links links={[["Home", "/"]]} logout={true} path={path}></Links>;
}
