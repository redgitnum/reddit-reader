import React from 'react';

let sortBy = [
    'Best',
    'Hot',
    'New',
    'Controversial',
    'Top',
    'Rising'
]

let Header = (props) => {
    return(
        <div className="header">
            <p className="title">Content Reader for Reddit</p>
        <div className="sortTitle">Sort By: </div>
            <div className="sortBtn">
                <span>{props.sub.slice(3)}</span>
                <div className="sortBtnItems">
                    {sortBy.map((item, i) => 
                    <div key={i} onClick={props.sortSub}>
                        {item}
                    </div>
                    )}       
                </div>
            </div> 
    </div>
    )
}
    
export default Header