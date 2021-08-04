import React from 'react';
import '../style/Post.css';
import Avatar from '@material-ui/core/Avatar';

function Post({username, caption, imageUrl}) {
    return (
        <div className="appPost">
            <div className="appPostHeader">
                <Avatar className="appPostAvatar" alt={username} src="https://barisarslan.com.tr/style/img/barisarslan.jpg" />
                <h3>{username}</h3>
            </div>
            <img className="appPostImage" src={imageUrl} alt="Post Image" />

            <h4 className="appPostText"><strong>{username}</strong>  {caption}</h4>
        </div>
    )
}

export default Post;