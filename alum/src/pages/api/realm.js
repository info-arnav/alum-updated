import Realm from "realm";

export default async function realm(req, res) {
  const app = new Realm.App({
    id: "alum-rdlcu",
  });

  let data = await app.emailPasswordAuth.registerUser({
    email: "abcd1.tech@gmail.com",
    password: "Arnav@300804",
    name: "testasdasd",
  });

  const credentials = Realm.Credentials.emailPassword(
    "abcd1.tech@gmail.com",
    "Arnav@300804"
  );

  const user = await app.logIn(credentials);
  console.log("Successfully logged in!", user.id);

  res.json(data);
}
