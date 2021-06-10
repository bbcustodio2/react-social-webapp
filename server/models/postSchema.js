const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            max: 500,
        },
        img: {
            type: String,
        },
        likes: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
    }
);
//creates a database in mongoose using User Model Structure
const PostSchema = mongoose.model("Posts", postSchema);

module.exports = PostSchema;
