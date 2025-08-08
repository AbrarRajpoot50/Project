const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

const mongoUrl = "mongodb://localhost:27017";
const dbName = "travelApp";
const collectionName = "destinations";
let db, destinationsCollection;

// Connect to MongoDB
MongoClient.connect(mongoUrl, { useUnifiedTopology: true })
  .then((client) => {
    db = client.db(dbName);
    destinationsCollection = db.collection(collectionName);
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });

// Middleware for validation
const validateDestination = (req, res, next) => {
  const { destination, continent, budget } = req.body;
  if (!destination || !continent || isNaN(parseFloat(budget))) {
    return res.status(400).json({ error: "Invalid destination data. Please provide destination, continent, and valid budget." });
  }
  next();
};

// CRUD for Destinations
app.get("/destinations", async (req, res) => {
  try {
    const { search, continent } = req.query;
    let query = {};
    if (search) {
      query.destination = { $regex: search, $options: "i" };
    }
    if (continent) {
      query.continent = { $regex: `^${continent}$`, $options: "i" };
    }
    const destinations = await destinationsCollection.find(query).toArray();
    res.json(destinations);
  } catch (err) {
    console.error("Error fetching destinations:", err);
    res.status(500).json({ error: "Error fetching destinations" });
  }
});

app.post("/destinations", validateDestination, async (req, res) => {
  try {
    // Integrity Check: Ensure unique destination names
    const exists = await destinationsCollection.findOne({ destination: req.body.destination });
    if (exists) {
      return res.status(409).json({ error: "Destination already exists." });
    }
    const newDestination = { 
      visited: false, 
      ...req.body,
      createdAt: new Date()
    };
    const result = await destinationsCollection.insertOne(newDestination);
    res.status(201).json({ ...newDestination, _id: result.insertedId });
  } catch (err) {
    console.error("Error adding destination:", err);
    res.status(500).json({ error: "Error adding destination" });
  }
});

app.put("/destinations/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = { ...req.body, updatedAt: new Date() };
    const result = await destinationsCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: "after" }
    );
    if (!result.value) {
      return res.status(404).json({ error: "Destination not found" });
    }
    res.json(result.value);
  } catch (err) {
    console.error("Error updating destination:", err);
    res.status(500).json({ error: "Error updating destination" });
  }
});

app.delete("/destinations/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await destinationsCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Destination not found" });
    }
    res.status(204).send();
  } catch (err) {
    console.error("Error deleting destination:", err);
    res.status(500).json({ error: "Error deleting destination" });
  }
});

// Reporting - Summary of all destinations
app.get("/report", async (req, res) => {
  try {
    const destinations = await destinationsCollection.find({}).toArray();
    const report = {
      totalDestinations: destinations.length,
      visited: destinations.filter((d) => d.visited).length,
      unvisited: destinations.filter((d) => !d.visited).length,
      budgetSummary: destinations.reduce((sum, d) => sum + parseFloat(d.budget || 0), 0),
      averageBudget: destinations.length > 0 ? destinations.reduce((sum, d) => sum + parseFloat(d.budget || 0), 0) / destinations.length : 0
    };
    res.json(report);
  } catch (err) {
    console.error("Error generating report:", err);
    res.status(500).json({ error: "Error generating report" });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Travel Planner API is running" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

module.exports = app;
