import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";

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
    return res.status(400).send("Invalid destination data.");
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
    res.status(500).send("Error fetching destinations");
  }
});

app.post("/destinations", validateDestination, async (req, res) => {
  try {
    // Integrity Check: Ensure unique destination names
    const exists = await destinationsCollection.findOne({ destination: req.body.destination });
    if (exists) {
      return res.status(409).send("Destination already exists.");
    }
    const newDestination = { visited: false, ...req.body };
    const result = await destinationsCollection.insertOne(newDestination);
    res.status(201).json({ ...newDestination, _id: result.insertedId });
  } catch (err) {
    res.status(500).send("Error adding destination");
  }
});

app.put("/destinations/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await destinationsCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: req.body },
      { returnDocument: "after" }
    );
    if (!result.value) {
      return res.status(404).send("Destination not found");
    }
    res.json(result.value);
  } catch (err) {
    res.status(500).send("Error updating destination");
  }
});

app.delete("/destinations/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await destinationsCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).send("Destination not found");
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).send("Error deleting destination");
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
    };
    res.json(report);
  } catch (err) {
    res.status(500).send("Error generating report");
  }
});

// Start the server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
