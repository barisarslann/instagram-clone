import React, { useEffect, useState } from 'react';
import '../style/Post.css';
import Avatar from '@material-ui/core/Avatar';
import { db } from '../firebase';
import firebase from 'firebase';

function Post({postId, user, username, caption, imageUrl}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        let unsubscribe;
        if(postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()))
                })
        }
        return () => {
            unsubscribe()
        }
    }, [postId])

    const postComment = (event) => {
        event.preventDefault()

        db.collection("posts")
            .doc(postId)
            .collection("comments")
            .add({
                text: comment,
                username: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            setComment('')
    }

    return (
        <div className="appPost">
            <div className="appPostHeader">
                <Avatar className="appPostAvatar" alt={username} src={imageUrl} />
                <h3>{username}</h3>
            </div>
            <img className="appPostImage" src={imageUrl} alt="Post Image" />
            <h4 className="appPostText"><strong>{username}</strong>  {caption}</h4>

            <div className="post__comments">
                {comments.map((comment) => (
                    <p>
                        <b>{comment.username}</b> {comment.text}
                    </p>
                ))}
            </div>
            {user && (
                <form>
                    <input
                        className="post__input"
                        type="text"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    
                    />
                    <button
                        disabled={!comment}
                        className="post__button"
                        type="submit"
                        onClick={postComment}
                    >
                        Post
                    </button>
                </form>
            )}
        </div>
    )
}

export default Post;