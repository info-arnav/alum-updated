import Links from "./links";

export default function Admin({ path }) {
  return <Links links={[["Home", "/"]]} logout={true} path={path}></Links>;
}
