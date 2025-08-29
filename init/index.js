const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
main().then(() => {
    console.log("connected to db")
})
.catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj,owner:'67d5ce16aeabf42c0fbe745e',
        geometry: obj.geometry && obj.geometry.type ? obj.geometry : {
            type: "Point",
            coordinates: [77.2090, 28.6139] // Default coordinates if missing
        }
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initiliazed");
}

initDB();