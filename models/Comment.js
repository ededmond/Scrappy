const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema ({
    author: {
        type: String,
        default: "Anonymous"
    },
    body: {
        type: String,
        required: true
    }
})

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;