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
        <div className="sortTitle">Sort: </div>
            <div className="sortBtn" onMouseOver={() => {
                let all = document.getElementsByClassName('sortBtnItems');
                for(let item of all) {
                    item.style.display = 'block'
                }
            }}
                onMouseOut={() => {
                    let all = document.getElementsByClassName('sortBtnItems');
                    for(let item of all) {
                        item.style.display = 'none'
                    }   
                }}>
                <span>{props.sub.slice(3)}</span>
                <div className="sortBtnItems">
                    {sortBy.map((item, i) => 
                    <div key={i} onClick={(e) => {
                        props.sortSub(e); 
                        let all = document.getElementsByClassName('sortBtnItems');
                            for(let item of all) {
                                item.style.display = 'none'
                            }
                        }
                    }>
                        {item}
                    </div>
                    )}       
                </div>
            </div> 
    </div>
    )
}
    
export default Header