import React from 'react';

const Footer = (props) => 
    <div className="postModalFooter">
        <a href="#commentsSection">{props.num_comments} comments </a>
        <a href={'https://www.reddit.com' + props.permalink} target="_blank" rel="noopener noreferrer">
            Permalink to og post
        </a>
    </div>

export default Footer;