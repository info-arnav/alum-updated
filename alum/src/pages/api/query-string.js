export default function QueryString(object) {
  let string = "";
  Object.keys(object).map(
    (e) =>
      (string = `${string}${e}:${
        object[e] ? JSON.stringify(object[e]) : `""`
      },`)
  );
  string = `{${string}}`.replaceAll("\n", " ");
  return string;
}
