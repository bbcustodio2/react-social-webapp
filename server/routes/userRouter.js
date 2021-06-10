const UserModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
const {
    default: strictTransportSecurity,
} = require("helmet/dist/middlewares/strict-transport-security");
const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("Welcome to Users!");
});

//update user
router.put("/:id", async (req, res) => {
    if (req.body.userId == req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);

                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).send(err);
            }
        }
        try {
            const user = await UserModel.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            return res.status(200).json("User has been Updated");
        } catch (err) {
            return res.status(500).send(err);
        }
    } else {
        return res.status(403).json("You can only update on your account");
    }
});
//delete user
router.delete("/:id", async (req, res) => {
    if (req.body.userId == req.params.id || req.body.isAdmin) {
        try {
            await UserModel.findOneAndDelete(req.params.id);
            return res.status(200).json("User has been deleted");
        } catch (err) {
            return res.status(500).send(err);
        }
    } else {
        return res.status(403).json("You can only delete on your account");
    }
});
//get a user
router.get("/:id", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        const { password, updatedAt, ...other } = user._doc;
        return res.status(200).json(other);
    } catch (err) {
        return res.status(500).send(err);
    }
});
//follow a user
router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await UserModel.findById(req.params.id);
            const currentUser = await UserModel.findById(req.body.userId);
            //update respective users
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({
                    $push: { following: req.params.id },
                });
                return res.status(200).json("User has been followed");
            } else {
                return res.status(403).json(err);
            }
        } catch (err) {
            return res.status(500).json("You already follow this user");
        }
    } else {
        return res.status(403).json("You can't follow yourself");
    }
});
//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await UserModel.findById(req.params.id);
            const currentUser = await UserModel.findById(req.body.userId);
            //update respective users
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({
                    $pull: { following: req.params.id },
                });
                return res.status(200).json("User has been unfollowed");
            } else {
                return res.status(403).json(err);
            }
        } catch (err) {
            return res.status(500).json("You already unfollowed this user");
        }
    } else {
        return res.status(403).json("You can't unfollow yourself");
    }
});
module.exports = router;
