import express from "express";
const app = express();
const port = 3000;

app.use(express.json());

app.get("/public", (request, response) => {
  response.send("public");
});

app.get("/private", (request, response) => {
  const auth = { login: "zli", password: "zli1234" };
  const b64auth = (request.headers.authorization || "").split(" ")[1] || "";
  const [login, password] = Buffer.from(b64auth, "base64")
    .toString()
    .split(":");
  if (login && password && login === auth.login && password === auth.password) {
    return response.send("private");
  }
  response.set("WWW-Authenticate", 'Basic realm="401"');
  response.status(401).send("Unauthorized");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
