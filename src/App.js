import React from 'react';
import './App.css';
import Header from './components/mainpage/Header.component';
import Posts from './components/mainpage/postslist/Posts.component';
import PostModal from './components/mainpage/commentpage/PostModal.component';

import * as utils from './components/utils/utils';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      sub: 'getBest',
      postVisible: false,
      comments: [],
      post: '',
      postId: '',
      data: '',
      last: '',
      timer: true,
      loading: true
    }
  }

sortSub = (e) => {
  this.setState(utils.sortSub(e)); 
}

changeVisibility = () => {
  this.setState({
    postVisible: !this.state.postVisible, 
    comments: '',
    post: ''
  },() => utils.overflowHide(this.state.postVisible))
}

getPost = (e) => {
  this.changeVisibility()
  utils.getPost(e, (result) => {
    this.setState(result)
  })
}

loadSub = () => {
  utils.loadSub(this.state.sub, (result) => {
    this.setState(result)
  })
}

loadMore = () => {
  utils.loadMore(this.state.sub, this.state.last, this.state.data, (result) => {
    this.setState(result)
  })
}

componentDidMount() {
  this.loadSub()
}

componentDidUpdate(prevProps, prevState) {
  if(prevState.sub !== this.state.sub) {
      this.loadSub()
  }
}

  render() {

    let viewArea = document.getElementById('root');

    viewArea.onscroll = () => {
        if (viewArea.scrollTop + viewArea.clientHeight+6000 >= viewArea.scrollHeight) {
            if(this.state.timer) {
                this.setState({
                    timer: false
                })
                this.loadMore();
                //delay to avoid multiple runs at the same time
                setTimeout(() => {
                    this.setState({timer: true})
                }, 1500)
            }
        }
    }
    window.onclick = (e) => {
      if(e.target.className === 'postModal' || 
          e.target.className === 'postModalClose') {
            this.changeVisibility();
          }
      else if(e.target.parentNode.className === 'postModalMedia') {
          (!e.target.parentNode.style.maxWidth || e.target.parentNode.style.maxWidth === '600px') ? 
          e.target.parentNode.style.maxWidth ='100%' : 
          e.target.parentNode.style.maxWidth ='600px'
      }

    }

    return(
      <div>
        <PostModal
        changeVisibility={this.changeVisibility} 
        postVisible={this.state.postVisible} 
        comments={this.state.comments} 
        post={this.state.post}
        putEmbed={utils.putEmbed}
        parseDate={utils.parseDate}
        />
        <Header 
        sub={this.state.sub} 
        sortSub={this.sortSub} 
        />
        <Posts 
        sub={this.state.sub} 
        data={this.state.data}
        last={this.state.last}
        getPost={this.getPost} 
        parseDate={utils.parseDate}
        />
      </div>
    )
  }
}
      

export default App;
