const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(cors());
app.use(express.json());

const destinationsFile = path.resolve(
  path.join(__dirname, "destinations.json")
);

// Helper to read/write JSON files
const readFile = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const writeFile = (file, data) =>
  fs.writeFileSync(file, JSON.stringify(data, null, 2));

// CRUD for Destinations
app.get("/destinations", (req, res) => {
  const destinations = readFile(destinationsFile);
  res.json(destinations);
});

app.post("/destinations", (req, res) => {
  const destinations = readFile(destinationsFile);
  const newDestination = { id: Date.now(), visited: false, ...req.body };
  destinations.push(newDestination);
  writeFile(destinationsFile, destinations);
  res.status(201).json(newDestination);
});

app.put("/destinations/:id", (req, res) => {
  const destinations = readFile(destinationsFile);
  const destinationIndex = destinations.findIndex(
    (d) => d.id === parseInt(req.params.id)
  );
  if (destinationIndex === -1)
    return res.status(404).send("Destination not found");
  destinations[destinationIndex] = {
    ...destinations[destinationIndex],
    ...req.body,
  };
  writeFile(destinationsFile, destinations);
  res.json(destinations[destinationIndex]);
});

app.delete("/destinations/:id", (req, res) => {
  const destinations = readFile(destinationsFile);
  const updatedDestinations = destinations.filter(
    (d) => d.id !== parseInt(req.params.id)
  );
  writeFile(destinationsFile, updatedDestinations);
  res.status(204).send();
});

// Start the server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
