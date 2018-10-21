const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: String,
    age: Number,
});

// Make a Mongo model (collection) called Author
// The objects within this collection look like the schema
module.exports = mongoose.model('Author', authorSchema);