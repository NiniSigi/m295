import express from 'express';
const app = express();
const port = 3000;
const namen = [
  "Lena",
  "Jonas",
  "Laura",
  "Timo",
  "Sarah",
  "Lukas",
  "Julia",
  "Niklas",
  "Anna",
  "Max",
  "Mia",
  "Paul",
  "Emma",
  "David",
  "Lisa",
  "Tom",
  "Sophia",
  "Luca",
  "Hannah",
  "Leon"
];
const jsonObject= {
  "Vorname": "Max",
  "Nachname": "Mustermann",
  "Alter": 30,
  "Wohnort": "Musterstadt",
  "Augenfarbe": "blau"
}


app.get('/now', (request, response) => {

  response.send(new Date().toLocaleString('de-CH',{timeZone: request.query.tz}));
});

app.get('/names', (request, response) => {
  response.send(namen);
});

app.post('/names', (request, response) => {
  namen.push(request.query.name)
  response.send(namen);
});

app.delete('/names', (request, response) => {
  const nameToDelete = request.query.name;
  const index = namen.indexOf(nameToDelete);
  if (index !== -1) {
    namen.splice(index, 1);
  }

  response.sendStatus(204);
});

app.get('/secret2', (request, response) => {
  const autheader = request.headers['authorization'];
if(autheader.toString() == 'Basic aGFja2VyOjEyMzQ='){
  response.sendStatus(200)
}else{
  response.sendStatus(401);
}
});

app.get('/cuck', async(request, response) => {
  const url = 'https://api.chucknorris.io/jokes/random'
  const data = await (await fetch(url)).json()
  let witz = data.value;
  witz = witz.replace("Chuck Norris", request.query.name)
  console.log(witz)
  response.send(witz);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
