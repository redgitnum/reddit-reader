import React from 'react';
import { css } from '@emotion/core';
import {MoonLoader} from 'react-spinners';
import {renderComments} from '../../../utils/utils';

const moonStyle = css`
    margin: 0 auto;
`;


const Comments = (props) => {
    const getComments = () => {
        return renderComments(Array.from(props.comments))   
     }

    return(
        <fieldset id="commentsSection">
            <legend>Comments</legend>
            {props.comments ? 
            getComments() : 
            <MoonLoader
            css={moonStyle}
            sizeUnit={"px"}
            size={60}
            color={'white'}
            loading={!props.comments.length}
            />
            }
            
        </fieldset>
    )
    
}

export default Comments