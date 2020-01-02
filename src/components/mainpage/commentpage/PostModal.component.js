import React from 'react';
import Header from './header/Header.component';
import PostMedia from './postMedia/PostMedia.component';
import Footer from './footer/Footer.component';
import Comments from './comments/Comments'

const PostModal = (props) => {

    let modalBody = document.getElementById('postModal');
    let buttonTop = document.getElementById('modalTop');
    if(modalBody) {
        modalBody.onscroll = () => {
            if(modalBody.scrollTop < 1200) {
                buttonTop.style.opacity = 0;
            }
            else {
                buttonTop.style.opacity = 1;
            }
        }
    }
    
    
    return(
        <div id="postModal" className="postModal" style={{display: props.postVisible ? 'block' : 'none'}}>
            {props.post && 
            <div className="postModalBody">
                <div className="postSingleVotes">
                    Score<br></br>{props.post[0].score > 1000 ? (props.post[0].score/1000).toFixed(2) + 'k': props.post[0].score}
                </div>
                <div className="postModalContent">
                    <Header 
                    author={props.post[0].author} 
                    created_utc={props.post[0].created_utc} 
                    title={props.post[0].title}
                    subreddit_name_prefixed={props.post[0].subreddit_name_prefixed}
                    />
                    {props.post[0].selftext &&<div dangerouslySetInnerHTML={{__html: props.post[0].selftext_html}} className="postModalText"></div>}
                    {props.post[0].preview && <PostMedia post={props.post}/>}
                    <Footer num_comments={props.post[0].num_comments} permalink={props.post[0].permalink}/>
                    <Comments comments={props.comments}/>
                </div>
                
            </div>}
            <a href="#postHead" id="modalTop">TOP</a>
        </div>
    )

}
    
export default PostModal