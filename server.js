const express = require("express");
const { MongoClient } = require("mongodb");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const uri = "mongodb+srv://revs:kuchipudi7122@cluster0.0dhoyvg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace this with your MongoDB Atlas URI
let collection;

// Connect to MongoDB Atlas
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
    collection = client.db().collection("Cat"); // Replace "Cat" with your collection name
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  }
}

// Middleware
app.use(express.static(path.join(__dirname, "public_html")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route to fetch all projects
app.get("/api/projects", (req, res) => {
  collection.find({}).toArray((err, result) => {
    if (err) {
      console.error("Error fetching projects:", err);
      res.status(500).json({ statusCode: 500, message: "Internal server error" });
    } else {
      res.status(200).json({ statusCode: 200, data: result, message: "Success" });
    }
  });
});

// Route to add a new project
app.post("/api/cat", (req, res) => {
  let cat = req.body;
  collection.insertOne(cat, (err, result) => {
    if (err) {
      console.error("Error inserting project:", err);
      res.status(500).json({ statusCode: 500, message: "Internal server error" });
    } else {
      res.status(201).json({ statusCode: 201, data: result, message: "Success" });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDB();
});
