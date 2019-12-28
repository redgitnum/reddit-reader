import React from 'react';
import {parseDate} from '../../../utils/utils';

const Header = (props) =>
    <div id="postHead" className="postModalHeader">
        Posted by <u>{props.author}</u>, {parseDate(props.created_utc)} on <u>{props.subreddit_name_prefixed}</u>
        <div className="postModalTitle">
            {props.title}
        </div>
        <button className="postModalClose">Close</button>
    </div>

export default Header;
