import React from 'react';
import axios from 'axios';
const shortid = require('shortid');

export const putEmbed = (media) => {
    setTimeout(() => {
      document.getElementById('mediaTarget').innerHTML = media;
    }, 0)  
}

export const sortSub = (e) => {
    let subName = 'get' + e.target.innerText;
    return {sub: subName}
}

export const overflowHide = (visible) => {
    let root = document.getElementById('root')
    root.style.overflow = visible ? 'hidden' : 'auto';
    root.style.paddingRight = visible ? '17px' : '0';
}

export const parseDate = (e) => {
    let date = new Date(e*1000);
    let now = new Date(Date.now());
    let seconds = Math.round((now - date)/1000)
    let timeAgo;
    switch (true) {
        case seconds<60: 
        timeAgo = seconds + ' seconds ago';
            break;
        case seconds<3600: 
        timeAgo = Math.round(seconds/60) + ' minutes ago';
            break;
        case seconds<86400: 
        timeAgo = Math.round(seconds/60/60) + ' hours ago';
            break;
        case seconds>86400: 
        timeAgo = Math.round(seconds/60/60/24) + ' days ago';
            break;
        default: timeAgo = seconds + ' seconds ago';

    }
    return timeAgo;
}

//create comments tree for a post
export const makeTree = (commentsRaw) => {
    let comments = commentsRaw;
    let commentsArray = []
    let result;
    if(comments) {
//looping through every comment from (comments)
comments.map((comment) => {
    function repeat(e) {
        if(!e.replies.length){
            result = {
                text: e.body,
                author: e.author,
                created_utc: e.created_utc,
                score: e.score,
                permalink: 'https://www.reddit.com' + e.permalink
            };
        }
        else {
            let reply = []
            //check every reply to parent comment
            for(let item of e.replies) {
                let result = {
                    text: item.body,
                    author: item.author,
                    created_utc: item.created_utc,
                    score: item.score,
                    permalink: 'https://www.reddit.com' + item.permalink
                }
                //check if reply has replies to it
                if(item.replies.length) {
                    //repeat process
                    result = repeat(item)
                }
                //put (nested) replies to parent into an array 
                reply.push(result)
            }
            //update result
            result = {
                text: e.body,
                author: e.author,
                created_utc: e.created_utc,
                score: e.score,
                permalink: 'https://www.reddit.com' + e.permalink,
                replies: reply
            }                       
        }
        return result
    }
    //run function first time
    repeat(comment)
    //push single comment tree into all array with all comments
    commentsArray.push(result)
    return commentsArray
})
    }
    
  // console.log(commentsArray)
  return commentsArray
}

export const loadSub = (sort, callback) => {
    axios.get('https://reddit-clone-control.herokuapp.com/' + sort)
    .then(res => res.data)
    .then(data => data.map(item => ({
    author: item.author,
    created_utc: item.created_utc,
    link_flair_text: item.link_flair_text,
    name: item.name,
    score: item.score > 1000 ? (item.score/1000).toFixed(2) + 'k': item.score,
    selftext: item.selftext,
    subreddit: item.subreddit,
    subreddit_name_prefixed: item.subreddit_name_prefixed,
    subreddit_subscribers: item.subreddit_subscribers,
    thumbnail: item.thumbnail,
    title: item.title,
    url: item.url,
    permalink: 'https://www.reddit.com' + item.permalink,
    preview: item.preview,
    num_comments: item.num_comments,
    })))
    .then(newData => {
    callback({ 
        data: [...newData],
        last: newData[newData.length-1].name,
        loading: false
    })
    })   
} 

export const getPost = (e, callback) => {
    axios.get('https://reddit-clone-control.herokuapp.com/postBody/' + e)
        .then(res => res.data)
        .then(result => callback({
            post: result
        }))
    axios.get('https://reddit-clone-control.herokuapp.com/postComments/' + e)
        .then(res => res.data)
        .then(data => makeTree(data))
        .then(result => callback({
            comments: result,
            postId: e
        }))
    
        
}

export const loadMore = (sort, lastName, prevData, callback) => {
    axios.get('https://reddit-clone-control.herokuapp.com/more/'+ sort + '/' + lastName)
        .then(res => res.data)
        .then(data => data.map(item => ({
            author: item.author,
            created_utc: item.created_utc,
            link_flair_text: item.link_flair_text,
            name: item.name,
            score: item.score > 1000 ? (item.score/1000).toFixed(2) + 'k': item.score,
            selftext: item.selftext,
            subreddit: item.subreddit,
            subreddit_name_prefixed: item.subreddit_name_prefixed,
            subreddit_subscribers: item.subreddit_subscribers,
            thumbnail: item.thumbnail,
            title: item.title,
            url: item.url,
            permalink: 'https://www.reddit.com' + item.permalink,
            preview: item.preview,
            num_comments: item.num_comments,
        })))
        .then(newData => callback({
            data: [...prevData, ...newData],
            last: newData[newData.length-1].name
        }))
}

export const renderComments = (comments) => {
    let compileComments = (comment) => {
        if(comment.replies) {
           return   <>
                        <div className="postSingleHeader">
                            <div className="postSingleAuthor">
                            {comment.author}
                            </div>
                            <div className="postSingleScore">
                            {comment.score} points
                            </div>
                            <div className="postSingleTime">
                            - {parseDate(comment.created_utc)}
                            </div>
                        </div>
                        <div className="postSingleText" dangerouslySetInnerHTML={{__html: comment.text}}>
                        </div>
                        {comment.replies.map((item) => <div className="postModalSingleComment" key={shortid.generate()}>{compileComments(item)}</div>)}
                    </>
        }
        return <>
                    <div className="postSingleHeader">
                        <div className="postSingleAuthor">
                        {comment.author}
                        </div><div className="postSingleScore">
                        {comment.score} points
                        </div>
                        <div className="postSingleTime">
                        - {parseDate(comment.created_utc)}
                        </div>
                    </div>
                    <div className="postSingleText">
                    {comment.text}
                    </div>
               </>
        
    }
    
    return (
        <ul>
            {comments.map((item) => <div className="postModalSingleComment" key={shortid.generate()}>{compileComments(item)}</div>)}
        </ul>
    )
    
    
}
