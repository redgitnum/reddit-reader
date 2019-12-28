import React from 'react'

const Header = (props) =>
    <div className="postHeader">
        Posted by <u>{props.author}</u>, {props.createdTime} on <u>{props.subreddit_name_prefixed}</u>
    </div>

export default Header