import express from "express";
import session from "express-session";
const app = express();
const port = 3000;

app.use(
  session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
);
app.use(express.json());

app.post("/name", (request, response) => {
    request.session.name = request.body.name;
    console.log(request.session.name);
    response.end(request.session.name);
});

app.get("/name", (request, response) => {
    response.end(request.session.name);
})

app.delete("/name", (request, response) => {
    request.session.destroy(() => {
        response.end("Session deleted");
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });