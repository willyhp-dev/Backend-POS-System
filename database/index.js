const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://willyhp:pontianak1@eduworkwilly.4cake.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const db = mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
db.then(() => {
  // eslint-disable-next-line
  console.log("Database Connection Established...!");
}).catch((err) => {
  // eslint-disable-next-line
  console.log("Error: Database connection can not be established...!", err);
});

module.exports = db;

