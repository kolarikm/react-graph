const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String
});

// Make a Mongo model (collection) called Book
// The objects within this collection look like the schema
module.exports = mongoose.model('Book', bookSchema);