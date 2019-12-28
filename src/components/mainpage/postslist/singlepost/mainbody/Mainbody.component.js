import React from 'react';

const Mainbody = (props) => 
    <div className="postBody">
        {props.selftext && <div className="postSelfText">
            {props.selftext.length > 200 ? props.selftext.slice(0,300) + '...': props.selftext}
            {props.selftext.length > 300 ? <div className="postSelfTextFadeOut"></div> : null}
            </div>}
            {props.preview && 
            <div className="postPreview">
                {props.url.slice(props.url.length-3) === 'gif' ?
                <img alt='' src={props.url} /> 
                :
                <img alt='' src={props.preview.images[0].source.url} />
                }
            </div>
            }
    </div>

export default Mainbody