import express from 'express';
const app = express();
const port = 3000;
const namen = [
  "Lena Müller",
  "Jonas Schmidt",
  "Laura Meier",
  "Timo Wagner",
  "Sarah Fischer",
  "Lukas Weber",
  "Julia Schulz",
  "Niklas Becker",
  "Anna Keller",
  "Max Richter",
  "Mia Wagner",
  "Paul Fischer",
  "Emma Huber",
  "David Müller",
  "Lisa Schäfer",
  "Tom Schmitt",
  "Sophia Lehmann",
  "Luca Zimmermann",
  "Hannah Hofmann",
  "Leon Braun"
];
const jsonObject= {
  "Vorname": "Max",
  "Nachname": "Mustermann",
  "Alter": 30,
  "Wohnort": "Musterstadt",
  "Augenfarbe": "blau"
}


app.get('/now', (request, response) => {
  response.send(new Date().toLocaleString('de-CH'));
});

app.get('/zli', (request, response) => {
  response.redirect('https://www.zli.ch/');
});

app.get('/name', (request, response) => {
  response.send(namen.random());
});

app.get('/html', (request, response) => {
  response.sendFile('/workspaces/m295-Backend/Aufgabe 3/aufgabe-3.3/response.html');
});

app.get('/image', (request, response) => {
  response.sendFile('/workspaces/m295-Backend/Aufgabe 3/aufgabe-3.3/netcetera.png');
});

app.get('/teapot', (request, response) => {
  response.status(418).send('this is a teapot')
});

app.get('/user-agent', (request, response) => {
  const userAgent = request.get('user-agent');
  response.send(userAgent);
});

app.get('/secret', (request, response) => {
  response.status(403).send('403')
});

app.get('/xml', (request, response) => {
  response.sendFile('/workspaces/m295-Backend/Aufgabe 3/aufgabe-3.3/xmlResonse.xml');
});

app.get('/me', (request, response) => {
  response.send(jsonObject);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});




Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}