import Docs from "./docs";

export default function Pending({ data }) {
  return (
    <main
      className="background nomargin"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "calc(100vh - 80px)",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <center>
        <p
          style={{
            fontWeight: "bold",
            marginBottom: 20,
            fontSize: 24,
            marginBottom: 50,
            marginTop: 40,
          }}
        >
          Pending Document Verification
        </p>
        <Docs data={data} pending-verification></Docs>
      </center>
    </main>
  );
}
