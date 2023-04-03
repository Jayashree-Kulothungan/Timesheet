const MongoClient = require('mongodb').MongoClient;

// Connection URI
const uri = "mongodb+srv://";

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true });

// Connect to the client
client.connect(err => {
  // Handle any errors
  if (err) {
    console.log(err);
  }

  // Use the client to perform operations
  const collection = client.db("test").collection("users");
  collection.find().toArray((err, docs) => {
    console.log(docs);
  });

  // Close the connection
  client.close();
});
