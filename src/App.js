import React, { Component } from 'react';
import logo from './logo.svg';
import uuid from 'uuid';
import axios from 'axios';
import './App.css';

let posts = [];
class App extends Component {
  constructor() {
    super();
    this.state = {
      doEdit: false,
      doEditPrev: false, 
      title: '',
      post: '',
      editPrevTitle: '',
      editPrevPost: '',
      posts: [],
      previousPosts: [],
    }
  }
  componentDidMount() {
    axios.get('/api/posts').then(res => {
      this.setState({posts: res.data.posts, previousPosts: res.data.previousPosts})
    }).catch(err => console.log('Get POsts error--------------', err));
  }
  createPost(e) {
    e.preventDefault();
    const { title, post } = this.state;
    const id = uuid.v4();
    axios.post('/api/posts', {title, post, id}).then(res => {
      console.log(res.data.posts);
      this.setState({posts: res.data.posts, previousPosts: res.data.previousPosts});
      console.log('FUCK U');
    }).catch(err => console.log('Create Post Error-------------', err));
  }
  handleTitle(val) {
    this.setState({title: val});
  }
  handlePost(val) {
    this.setState({post: val});
  }
  handleEditTitle(val) {
    this.setState({editTitle: val});
  }
  handleEditPost(val) {
    this.setState({editPost: val});
  }
  handlePrevEditTitle(val) {
    this.setState({editPrevTitle: val})
  } 
  handlePrevEditPost(val) {
    this.setState({editPrevPost: val});
  }
  selectPost(id) {
    const copyOfArr = this.state.posts.slice();
    let filteredPost = copyOfArr.filter(post => post.id === id)[0];
    this.setState({currentPost: filteredPost})
  }
  selectPrevPost(id) {
    const copyOfArr = this.state.previousPosts.slice();
    let filteredPost = copyOfArr.filter(post => post.id === id)[0];
    this.setState({currentPrevPost: filteredPost})
  }
  editPost(id) {
    console.log(id);
    const { editTitle, editPost, doEdit } = this.state;
    if(doEdit && (editTitle || editPost)) {
      axios.put('/api/post/' + id, {title: editTitle, post: editPost}).then(res => {
        this.setState({posts: res.data.posts, previousPosts: res.data.previousPosts, editPost: '', editTitle: '', doEdit: false});
      }).catch(err => console.log("axios put error---------------", err))
    } else {
      this.setState({doEdit: !this.state.doEdit});
    }
  }
  editPrevPost(id) {
    console.log(id);
    const { editPrevTitle, editPrevPost, doEditPrev } = this.state;
    if(doEditPrev && (editPrevTitle || editPrevTitle)) {
      axios.put('/api/previous_post/' + id, {title: editPrevTitle, post: editPrevPost}).then(res => {
        this.setState({ previousPosts: res.data.previousPosts, editPrevPost: '', editPrevPost: '', doEditPrev: false});
      }).catch(err => console.log("axios put error---------------", err))
    } else {
      this.setState({doEditPrev: !this.state.doEditPrev});
    }
  }
  deletePost(id) {
    if(window.confirm('Do you want to delete this posts?')){
      axios.delete('/api/post/'+ id).then(res => {
        this.setState({post: res.data.posts});
      }).catch(err => console.log('Delete Post Error---------', err));
    }
  }
  deletePrevPost(id) {
    if(window.confirm('Do you want to delete this post forever')){
      axios.delete('/api/previous_post/'+ id).then(res => {
        this.setState({post: res.data.posts});
      }).catch(err => console.log('Delete Post Error---------', err));
    }
  }
  render() {
    const { posts } = this.state;
    return (
      <div className="App">
        <div>
          <form>
            <input type='text' onChange={e => this.handleTitle(e.target.value)} />
            <input type='text' onChange={e => this.handlePost(e.target.value)} />
            <button onClick={(e) => this.createPost(e)}>Create Post</button>
          </form>
          <div>
           <h1> Current Posts</h1> 
            {posts && posts.length 
            && posts.map((post, i) => <div key={i} style={{color: post.color}}>
                                      <h3 onClick={() => this.selectPost(post.id)}>Title: {post.title}</h3>
                                      <h3>Description: </h3>
                                      <p>{post.post}</p>
                                      <button onClick={() => this.editPost(post.id)}>Edit</button>
                                      <button onClick={() => this.deletePost(post.id)}>Delete</button>
                                      </div>)}
            <div style={{display: this.state.doEdit ? 'inline-block' : 'none' }}>
              <input type='text' onChange={(e) => this.handleEditTitle(e.target.value)}
              placeholder={this.state.currentPost && this.state.currentPost.title} value={this.state.editTitle} />
              <input type='text' onChange={(e) => this.handleEditPost(e.target.value)}
              placeholder={this.state.currentPost && this.state.currentPost.post} value={this.state.editPost} />
            </div>
            <div  style={{display: this.state.currentPost ? 'inline-block' : 'none', background: 'gold', color: 'red'}}>
              <p>{this.state.currentPost && this.state.currentPost.title}</p>
              <p>{this.state.currentPost && this.state.currentPost.post}</p>
            </div>
          </div>
          <div>
            <h1>Previous Posts</h1>
            {this.state.previousPosts && this.state.previousPosts.map((post, i) => <div key={i} style={{color: post.color}}>
                                                                                <h3 onClick={() => this.selectPrevPost(post.id)}
                                                                                >Title: {post.title}</h3>
                                                                                <h3>Description: </h3>
                                                                                <p>  
                                                                                  {post.post}
                                                                                </p>
                                                                                <button onClick={() => this.editPrevPost(post.id)}>Edit</button>
                                                                                <button onClick={() => this.deletePrevPost(post.id)}>Delete</button>                                                                              </div>)}
            <div style={{display: this.state.doEditPrev ? 'inline-block' : 'none' }}>
              <input type='text' onChange={(e) => this.handlePrevEditTitle(e.target.value)}
              placeholder={this.state.currentPrevPost && this.state.currentPrevPost.title} value={this.state.editPrevTitle} />
              <input type='text' onChange={(e) => this.handlePrevEditPost(e.target.value)}
              placeholder={this.state.currentPrevPost && this.state.currentPrevPost.post} value={this.state.editPrevPost} />
            </div>
            <div style={{display: this.state.currentPrevPost ? 'inline-block' : 'none', background: 'gold'}}>
              <p>{this.state.currentPrevPost && this.state.currentPrevPost.title}</p>
              <p>{this.state.currentPrevPost && this.state.currentPrevPost.post}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
