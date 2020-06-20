const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    // describe different data types 
    // mongodb will automtically create IDs for each book
    name: String,
    genre: String,
    authorId: String
});

// model refers to a collection in the db
module.exports = mongoose.model('Book', bookSchema);
