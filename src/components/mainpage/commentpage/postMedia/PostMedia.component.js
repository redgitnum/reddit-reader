import React from 'react';
import {putEmbed} from '../../../utils/utils'

const PostMedia = (props) => 
    <div className="postModalMedia" id="mediaTarget">
        {props.post[0].media ? 
        props.post[0].media.oembed ?
        putEmbed(props.post[0].media.oembed.html) :
        <video 
            src={props.post[0].media.reddit_video.fallback_url}
            controls
        />: props.post[0].crosspost_parent_list ?
        props.post[0].crosspost_parent_list[0].media ?
        <video 
            src={props.post[0].crosspost_parent_list[0].media.reddit_video.fallback_url}
            controls
        />: <img alt='' src={props.post[0].crosspost_parent_list[0].preview.images[0].source.url} />
        : props.post[0].url.slice(props.post[0].url.length-3) === 'gif' ?
            
        <img alt='' src={props.post[0].url} /> :
        <img alt=''title="Click to expand" src={props.post[0].preview.images[0].source.url} />
        }
    </div>

export default PostMedia