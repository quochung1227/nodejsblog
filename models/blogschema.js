const mongoose = require("../blog");
const schema = new mongoose.Schema({
    posts: {
        _id: String,
        title: String,
        content: String,
        require: true
    }
});

module.exports = mongoose.model("Users", schema);