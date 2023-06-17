const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/talentservedb');
}

const userSchema = new mongoose.Schema({
    name: String,
    id: Number,
    role: String,
    instagram: String,
    facebook: String,
    linkedin: String,
    twitter: String
});

const User = mongoose.model('Entry', userSchema);


const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
// Define a route to fetch data
app.get('/details', (req, res) => {
  // Fetch data from MongoDB
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'An error occurred' });
    });
});

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

