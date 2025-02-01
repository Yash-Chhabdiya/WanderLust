const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderingLust";
const Listing = require("../model/listing.js");
const sampleData = require("./data.js");


main().then(()=>{
    console.log("connected to DB")
})
.catch((err) => console.log(err));
async function main() {
  await mongoose.connect(MONGO_URL);
}
const initDB = async()=>{
   await Listing.deleteMany({});
   sampleData.data=sampleData.data.map((obj)=>({...obj,owner:'679b8959d21c3a152532749d'}))
   await Listing.insertMany(sampleData.data);
   console.log("Data was initialised");
}
initDB(); 
//'679b8959d21c3a152532749d'