const mongoose = require('mongoose');
const Schema = mongoose.Schema
const Review = require("./review.js");
// 
//you do not need to establish a connection to create schema
//because you are not creating anything on the database.

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        type: String,
        default: "https://unsplash.com/photos/a-beach-with-palm-trees-and-a-sunset-2YjUoTdqD1s",
        set: (v) => {
            if (!v || v.trim() === "") {
                return "https://unsplash.com/photos/a-beach-with-palm-trees-and-a-sunset-2YjUoTdqD1s";
            }
            return v;
        },
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } })
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
