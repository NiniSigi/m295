import express from "express";
const app = express();
const port = 3000;

app.get("/:plz", async (request, response) => {
  try {
    const result = await getTemperatur(request.params.plz);
    let temperature = result.currentWeather.temperature
    console.log(result.currentWeather.temperature)
    response.status(200).send( `your curent temperatur in ${request.params.plz}: ` +temperature.toString());
  } catch (error) {
    console.error("Error:", error.message);
    response.status(500).send("Internal Server Error");
  }
});

async function getTemperatur(plz) {
  try {
    const response = await fetch(`https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=${plz}00`)
    const data = await response.json()
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
