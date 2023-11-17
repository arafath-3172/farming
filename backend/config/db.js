const mongoose = require('mongoose');
mongoose.set("strictQuery", true);
main().catch(err => console.log(err));

async function main() {
  
  await mongoose.connect("mongodb://localhost:27017/tds");
  console.log("Connected to mongoose");
}
module.exports = main;