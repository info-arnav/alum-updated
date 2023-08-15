import Docs from "./docs";

export default function Pending({ data }) {
  return (
    <main
      className="background nomargin"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        minHeight: "calc(100vh - 80px)",
      }}
    >
      <center>
        <p
          style={{
            fontWeight: "bold",
            marginBottom: 20,
            fontSize: 35,
            marginBottom: 50,
            marginTop: 40,
          }}
        >
          Pending Document Verification
        </p>
        <Docs data={data}></Docs>
      </center>
    </main>
  );
}
