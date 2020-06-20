const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    // describe different data types 
    // mongodb will automtically create IDs for each book
    name: String,
    age: Number
});

// model refers to a collection in the db
module.exports = mongoose.model('Author', authorSchema);