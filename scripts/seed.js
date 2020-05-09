const axios = require("axios");
const db = require("../models");
const mongoose = require("mongoose");
mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/googlebooks"
  );
SEARCH_STR = "javascript";
RESULTS = 5;
axios.get("https://www.googleapis.com/books/v1/volumes?q=\"Javascript\"").then(
    res => {


        const seeds = res.data.items.slice(0,RESULTS).map(item=> {return {title: item.volumeInfo.title, 
            authors: item.volumeInfo.authors,
            description: item.volumeInfo.description,
            thumbnail: item.volumeInfo.imageLinks.thumbnail,
            link: item.volumeInfo.infoLink
        }})
        db.Book
        .remove({})
        .then(() => db.Book.collection.insertMany(seeds))
        .then(data => {
            console.log(data.result.n + " records inserted!");
            process.exit(0);
        })
        .catch(err => {
            console.error(err);
            process.exit(1);
        });


    }
)

