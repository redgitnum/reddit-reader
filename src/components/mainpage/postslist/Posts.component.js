import React from 'react';
import Masonry from 'react-masonry-css';
import { css } from '@emotion/core';
import {MoonLoader} from 'react-spinners'
import SinglePost from './singlepost/SinglePost.component'

const moonStyle = css`
    margin: 100px auto 0;
`;

const Posts = (props) => {
    return(
        <>
        {props.data ?
            <Masonry 
                className='posts'
                columnClassName=''
                breakpointCols={{
                    default: 3,
                    1100: 2,
                    700: 1
                }}
            >
                {props.data.map((post, i) => 
                    <SinglePost 
                    post ={post} 
                    key={i} 
                    getPost={props.getPost}
                    parseDate={props.parseDate}
                    />                
                )}
            </Masonry>
            : 
            <MoonLoader
            css={moonStyle}
            sizeUnit={"px"}
            size={120}
            color={'white'}
            loading={props.loading}
            />
        }
        </>
    )
         
}

export default Posts