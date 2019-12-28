import React from 'react';

const Title = (props) =>
    <div className="postTitle">
        {props.flair && <span className="postFlair">{props.flair}</span>} {props.title}
    </div>

export default Title;