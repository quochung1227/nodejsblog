const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true }
});

// Export the model
module.exports = mongoose.model('blog', blogSchema);