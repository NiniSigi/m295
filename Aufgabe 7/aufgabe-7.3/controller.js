import express from "express";
import { v4 as uuidv4 } from "uuid";
import session from "express-session";
const app = express();
const port = 3000;

const secretAdminCredentials = { email: "desk@library.example", password: "m295" }
let books = [
  {
    isbn: "978-3-522-46051-4",
    title: "Momo",
    author: "Michael Ende",
    year: 2023,
  },
  {
    isbn: "978-3-16-148410-0",
    title: "Der Herr der Ringe",
    author: "J.R.R. Tolkien",
    year: 1954,
  },
  {
    isbn: "",
    title: "Harry Potter und der Stein der Weisen",
    author: "J.K. Rowling",
    year: 1997,
  },
  {
    isbn: "978-3-423-20125-3",
    title: "Die Verwandlung",
    author: "Franz Kafka",
    year: 1915,
  },
  {
    isbn: "978-3-15-009381-1",
    title: "Faust",
    author: "Johann Wolfgang von Goethe",
    year: 1808,
  },
  {
    isbn: "978-3-15-010818-8",
    title: "Der Kleine Prinz",
    author: "Antoine de Saint-Exupéry",
    year: 1943,
  },
  {
    isbn: "978-3-446-19289-6",
    title: "1984",
    author: "George Orwell",
    year: 1949,
  },
  {
    isbn: "978-3-499-22620-1",
    title: "Der Steppenwolf",
    author: "Hermann Hesse",
    year: 1927,
  },
  {
    isbn: "978-3-312-00387-6",
    title: "Der Alchimist",
    author: "Paulo Coelho",
    year: 1988,
  },
  {
    isbn: "978-3-453-29115-6",
    title: "Die Unendliche Geschichte",
    author: "Michael Ende",
    year: 1979,
  },
];
let lends = [
  {
    id: "2f5f028d-0e32-4e0d-bf8a-0cc4b5b63c82",
    customer_id: "1",
    isbn: "978-3-522-46051-4",
    borrowed_at: "2024-05-14T08:00:00Z",
    returned_at: null,
  },
];

app.use(
  express.json(),
  session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
);

app.get("/books", (request, response) => {
  response.send(books);
});

app.get("/books/:isbn", (request, response) => {
  const isbn = request.params.isbn;
  response.send(books.find((book) => book.isbn === isbn));
});

app.post("/books", (request, response) => {
  books = [...books, request.body];
  response.send(request.body);
});

app.put("/books/:isbn", (request, response) => {
  books = books.map((book) =>
    book.isbn === request.params.isbn ? request.body : book
  );
  response.send(books);
});

app.delete("/books/:isbn", (request, response) => {
  books = books.filter((book) => book.isbn !== request.params.isbn);
  response.send(books);
});

app.patch("/books/:isbn", (request, response) => {
  const isbn = request.params;
  const updatedBook = request.body;
  books = books.map((book) =>
    book.isbn === isbn ? { ...book, ...updatedBook } : book
  );
  response.send(books);
});

app.get("/lends", (request, response) => {
  if (!request.session.email) {
    return response.status(401).send("Unauthorized");
  }
  response.send(lends);
});

app.get("/lends/:id", (request, response) => {
  if (!request.session.email) {
    return response.status(401).send("Unauthorized");
  }
  response.send(lends.find((lend) => lend.id === request.params.id));
});

app.post("/lends", (request, response) => {
  if (!request.session.email) {
    return response.status(401).send("Unauthorized");
  }
  const completBook = {
    ...request.body,
    id: uuidv4(),
    borrowed_at: new Date().toLocaleString("de-CH"),
    returned_at: null,
  };
  lends = [...lends, completBook];
  response.send(completBook);
});

app.delete("/lends/:id", (request, response) => {
  if (!request.session.email) {
    return response.status(401).send("Unauthorized");
  }
  const lend = lends.find((lend) => lend.id === request.params.id);
  const lendReturned = {
    ...lend,
    returned_at: new Date().toLocaleString("de-CH"),
  };
  console.log(lendReturned);
  lends = lends.map((book) =>
    book.id === request.params.id ? { ...book, ...lendReturned } : book
  );
  response.send(lends);
});
app.post("/login", (request, response) => {
  const { email, password } = request.body
	if (email?.toLowerCase() == secretAdminCredentials.email && password == secretAdminCredentials.password) {
		request.session.email = email
		return response.status(200).json({ email: request.session.email })
	}
  return response.status(401).json({ error: "Invalid credentials" })
});
app.get("/verify", function (request, response) {
  if (request.session.email) {
    return response.status(200).json({ email: request.session.email });
  }

  return response.status(401).json({ error: "Not logged in" });
});

app.delete("/logout", function (request, response) {
  if (request.session.email) {
    request.session.email = null;
    return response.status(204).send();
  }
  return response.status(401).json({ error: "Not logged in" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
