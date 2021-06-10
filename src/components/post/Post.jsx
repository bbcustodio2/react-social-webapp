import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { Users } from "../../dummyData";
export default function Post({ post }) {
    const user = Users.filter((user) => user.id === 1);
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img
                            src={
                                Users.filter(
                                    (user) => user.id === post.userId
                                )[0].profilePicture
                            }
                            alt=""
                            className="postProfileImg"
                        />
                        <span className="postUsername">
                            {
                                Users.filter(
                                    (user) => user.id === post.userId
                                )[0].username
                            }
                        </span>
                        <span className="postDate">{post.date}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post.desc}</span>
                    <img src={post.photo} alt="" className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img
                            className="likeIcon"
                            src="assets/like.png"
                            alt=""
                        />
                        <img
                            className="likeIcon"
                            src="assets/heart.png"
                            alt=""
                        />
                        <span className="likeCounter">
                            {post.like} People Liked this
                        </span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">
                            {post.comment} Comments
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
