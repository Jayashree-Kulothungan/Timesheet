const MongoClient = require('mongodb').MongoClient;

// Connection URI
const uri = "mongodb+srv://deepakhariharan1999:7PCUpiRxs0LwkAps@cluster0.nx9pp8n.mongodb.net/test?retryWrites=true&w=majority";

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
