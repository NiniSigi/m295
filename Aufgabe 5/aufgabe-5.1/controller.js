import express from 'express';
const app = express();
const port = 3000;

let books = [
  {"isbn": "978-3-522-46051-4", "title": "Momo", "author": "Michael Ende", "year": 2023},
  {"isbn": "978-3-16-148410-0", "title": "Der Herr der Ringe", "author": "J.R.R. Tolkien", "year": 1954},
  {"isbn": "978-3-446-13470-4", "title": "Harry Potter und der Stein der Weisen", "author": "J.K. Rowling", "year": 1997},
  {"isbn": "978-3-423-20125-3", "title": "Die Verwandlung", "author": "Franz Kafka", "year": 1915},
  {"isbn": "978-3-15-009381-1", "title": "Faust", "author": "Johann Wolfgang von Goethe", "year": 1808},
  {"isbn": "978-3-15-010818-8", "title": "Der Kleine Prinz", "author": "Antoine de Saint-Exupéry", "year": 1943},
  {"isbn": "978-3-446-19289-6", "title": "1984", "author": "George Orwell", "year": 1949},
  {"isbn": "978-3-499-22620-1", "title": "Der Steppenwolf", "author": "Hermann Hesse", "year": 1927},
  {"isbn": "978-3-312-00387-6", "title": "Der Alchimist", "author": "Paulo Coelho", "year": 1988},
  {"isbn": "978-3-453-29115-6", "title": "Die Unendliche Geschichte", "author": "Michael Ende", "year": 1979}
];

app.use(express.json());

app.get('/books', (request, response) => {
  response.send(books);
});

app.get('/books/:isbn', (request, response) => {
  const isbn =request.params.isbn
  response.send(books.find((book) => book.isbn === isbn));
});

app.post('/books',(request, response) => {
  books = [...books, request.body]
  response.send(request.body)
});

app.put('/books/:isbn',(request, response) => {
  books = books.map((book)=> book.isbn === request.params.isbn ? request.body :book);
  response.send(books)
});

app.delete('/books/:isbn',(request, response) => {
  books = books.filter((book)=> book.isbn !== request.params.isbn);
  response.send(books)
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});