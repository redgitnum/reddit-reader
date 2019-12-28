import React from 'react';

const Footer = (props) => 
    <div className="postFooter">
        <span className="postCommentsCount">{props.num_comments} comments</span>
        <a className="postPermalink" href={props.permalink} target="_blank" rel="noopener noreferrer">Permalink to og post</a>
    </div>

export default Footer