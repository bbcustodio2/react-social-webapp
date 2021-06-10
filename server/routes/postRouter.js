const router = require("express").Router();
const PostModel = require("../models/postSchema");
const UserModel = require("../models/userSchema");
//create a post
router.post("/", async (req, res) => {
    try {
        const newPost = new PostModel(req.body);
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});
//update a post

router.put("/:id", async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("Post Updated!");
        } else {
            return res.status(403).json("You can only update your posts");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});
//delete a post
router.delete("/:id", async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("Post Deleted!");
        } else {
            return res.status(403).json("You can only delete your posts");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

//like or dislike a post
router.put("/:id/like", async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            return res.status(200).json("The post has been liked");
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            return res.status(200).json("The post has been disliked");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});
//get a post
router.get("/:id", async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        return res.status(200).json(post);
    } catch (err) {
        return res.status(500).json(err);
    }
});
//get timeline posts
router.get("/timeline/:id", async (req, res) => {
    try {
        const currentUser = await UserModel.findById(req.body.userId);

        const userPosts = await PostModel.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.following.map((friendId) => {
                return PostModel.find({ userId: friendId });
            })
        );

        res.json(userPosts.concat(...friendPosts));
    } catch (err) {
        return res.status(500).json(err);
    }
});
module.exports = router;
