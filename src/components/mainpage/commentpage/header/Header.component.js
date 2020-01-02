import React from 'react';
import {parseDate} from '../../../utils/utils';

const Header = (props) =>
<>
    <div id="postHead" className="postModalHeader">
        <div className="postModalInfo">
            Posted by <u>{props.author}</u>, {parseDate(props.created_utc)} on <u>{props.subreddit_name_prefixed}</u>
        </div>
        <button className="postModalClose">X</button>
        <div className="postModalTitle">
            {props.title}
        </div>
        
    </div>
    
</>

export default Header;
