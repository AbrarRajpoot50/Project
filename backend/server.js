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

// Middleware for validation
const validateDestination = (req, res, next) => {
  const { destination, continent, budget } = req.body;
  if (!destination || !continent || isNaN(parseFloat(budget))) {
    return res.status(400).send("Invalid destination data.");
  }
  next();
};

// CRUD for Destinations
app.get("/destinations", (req, res) => {
  const destinations = readFile(destinationsFile);
  
  // Search functionality
  const { search, continent } = req.query;
  let filteredDestinations = destinations;

  if (search) {
    filteredDestinations = filteredDestinations.filter((d) =>
      d.destination.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (continent) {
    filteredDestinations = filteredDestinations.filter(
      (d) => d.continent.toLowerCase() === continent.toLowerCase()
    );
  }

  res.json(filteredDestinations);
});
app.get("/destination", (req, res) => {
  const destinations = readFile(destinationsFile);
  const { search = "", continent = "" } = req.query;

  console.log("Query Parameters:", { search, continent });

  let filteredDestinations = destinations;

  if (search) {
    filteredDestinations = filteredDestinations.filter((d) =>
      d.destination.toLowerCase().includes(search.toLowerCase())
    );
    console.log("After Search Filter:", filteredDestinations);
  }

  if (continent) {
    filteredDestinations = filteredDestinations.filter(
      (d) => d.continent.toLowerCase() === continent.toLowerCase()
    );
    console.log("After Continent Filter:", filteredDestinations);
  }

  res.json(filteredDestinations);
});
app.post("/destinations", validateDestination, (req, res) => {
  const destinations = readFile(destinationsFile);
  
  // Integrity Check: Ensure unique destination names
  if (destinations.some((d) => d.destination === req.body.destination)) {
    return res.status(409).send("Destination already exists.");
  }

  const newDestination = { id: Date.now(), visited: false, ...req.body };
  destinations.push(newDestination);
  writeFile(destinationsFile, destinations);
  res.status(201).json(newDestination);
});

app.put("/destinations/:id", validateDestination, (req, res) => {
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

// Reporting - Summary of all destinations
app.get("/report", (req, res) => {
  const destinations = readFile(destinationsFile);

  const report = {
    totalDestinations: destinations.length,
    visited: destinations.filter((d) => d.visited).length,
    unvisited: destinations.filter((d) => !d.visited).length,
    budgetSummary: destinations.reduce((sum, d) => sum + parseFloat(d.budget || 0), 0),
  };

  res.json(report);
});

// Start the server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
