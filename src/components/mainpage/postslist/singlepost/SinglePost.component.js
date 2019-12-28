import React from 'react';
import Header from './header/Header.component';
import Title from './title/Title.component';
import Mainbody from './mainbody/Mainbody.component';
import Footer from './footer/Footer.component';
import {parseDate} from '../../../utils/utils'

const SinglePost = (props) => {
    return(
        <div className="postContainer" onClick={(e) => {
            if(e.target.className !== 'postPermalink'){
                props.getPost(props.post.name)
            }
        }
        }>
            <div className="votes">{props.post.score}</div>
            <div className="post">
                <Header 
                author={props.post.author} 
                createdTime={parseDate(props.post.created_utc)}
                subreddit_name_prefixed={props.post.subreddit_name_prefixed}
                />
                <Title flair={props.post.link_flair_text} title={props.post.title}/>
                <Mainbody 
                selftext={props.post.selftext}
                preview={props.post.preview}
                url={props.post.url}
                />
                <Footer num_comments={props.post.num_comments} permalink={props.post.permalink}/>
            </div>
        </div>
    )
}


export default SinglePost;