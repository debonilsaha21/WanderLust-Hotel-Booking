const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const Listing = require("../models/listing.js");
const data = require("./data.js");  //we are importing the object named data which contains a key data
const db_url = process.env.ATLASDB_URL;

async function main() {
    await mongoose.connect(db_url);
}

main()
    .then((res) => { console.log("Mongodb connected") })
    .catch(err => console.log(err));

const initDb = async () => {
    await Listing.deleteMany({});           // to ensure that the database starts with a clean state
    data.data = data.data.map((obj) => ({ ...obj, owner: '687f94cf27debdfe3d657ca8' }))
    await Listing.insertMany(data.data);    //list of objects
    console.log("Data was initialized");
};

initDb();