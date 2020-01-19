Slide #45: reducer is the robot ...
the store knows which reducer gonna manage those changes

open code-pen
add this in settings  + js + choose:bable + https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.5/redux.js
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const {createStore}  = Redux;

const initState = {
  todos: [],
  posts: []
}
function myReducer(state = initState, action) {
  //  state will not be exist
  console.log(action, state)
}

const store = createStore (myReducer)

const todoAction  = {
  type: 'ADD_TODO1',
  todo: 'buy laptop'
}

store.dispatch(todoAction)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
now open console - watch the logged opbject
so, what did we got?
  we got a state which is connected to components
  and we have the ability to dispatch modifications from a componets to
  the state , and later we will hook changes into the components


no, lets update the state when disptahced:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const {createStore}  = Redux;

const initState = {
  todos: [],
  posts: []
}
function myReducer(state = initState, action) {
  //  state will not be exist
  console.log(action, state)
  if (action.type == 'ADD_TODO1') {
    return {
      // this will be the new state
      todos: [...state.todos, action.todo]
    }
  }
}

const store = createStore (myReducer)

const todoAction  = {
  type: 'ADD_TODO1',
  todo: 'buy laptop'
}

store.dispatch(todoAction)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1. we created a store
2. we created a reducrer passed nto the store
3. we created an action, the reducer gets the action and adds it to the store
4. now, lets subscribe to the reducer [will be inside a component later]
  
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const {createStore}  = Redux;

const initState = {
  todos: [],
  posts: []
}
function myReducer(state = initState, action) {
  //  state will not be exist
  console.log(action, state)
  if (action.type == 'ADD_TODO1') {
    return {
      // this will be the new state
      ...state,
      todos: [...state.todos, action.todo]
    }
  }
}

const store = createStore (myReducer)

store.subscribe(() => {
  // will fire every time the state changes
  console.log('state updated')
  console.log(store.getState())
})

const todoAction  = {
  type: 'ADD_TODO1',
  todo: 'buy laptop3'
}

store.dispatch(todoAction)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  let's add some more actions
    
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const {createStore}  = Redux;

const initState = {
  todos: [],
  posts: []
}
function myReducer(state = initState, action) {
  //  state will not be exist
  console.log(action, state)
  if (action.type == 'ADD_TODO1') {
    return {
      // this will be the new state
      ...state,
      todos: [...state.todos, action.todo]
    }
  }
   if (action.type == 'ADD_POSTS') {
    return {
      // this will be the new state
      ...state,
      posts: [...state.posts, action.todo]
    }
  }
}

const store = createStore (myReducer)

store.subscribe(() => {
  // will fire every time the state changes
  console.log('state updated')
  console.log(store.getState())
})

const todoAction  = {
  type: 'ADD_TODO1',
  todo: 'buy laptop3'
}

store.dispatch(todoAction)
store.dispatch({
  type: 'ADD_TODO1',
  todo: 'buy car'
})

store.dispatch({
  type: 'ADD_POSTS',
  todo: 'buy sushi'
})
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
so now we also have posts
look at the diagram, we completed the dispatch + store






now let's go to our app:

npm install redux react-redux
create a reducers folder (more than 1 reducer in big apps)
create rootReducer.js
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
index.js:
==========
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
// the provider will wrap our App component
// will provide our applciation with the store
import rootReducer from './reducers/rootReducer'

const store = createStore(rootReducer)
// how do we associate how store with react? second package
ReactDOM.render(<Provider store={store}><App /></Provider>, 
        document.getElementById('root'));

// lets create reducers folder - becuase when the app
// gets bigger it has more then 1 reducrer  

rootReducer.js:
===============
const initState = {
    posts: []
}
const rootReducer = (state = initState, action) => {
    return state
};

export default rootReducer
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

 
 now we'll replace the store data with posts from json place holder
to use them in the store
go to json place holder posts and take the first 3 posts:
only id, title, body
remove componentDidMount from the Home
also remove the state object from Home 
we need HOC to connect with the redux store
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
rootReducer.js
==============
  const initState = {
    posts: [
        {
            "id": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
          },
          {
            "id": 2,
            "title": "qui est esse",
            "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
          },
          {
            "id": 3,
            "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
            "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
          }

    ]
}
const rootReducer = (state = initState, action) => {
    return state
};

export default rootReducer

Home.js:
========
  import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Pokeball from './../pokeball.png'
import { connect } from 'react-redux';
// connects is a fucn which return HOC 

class Home extends Component {
  render(){
    console.log(this.props)
    const { posts } = this.props
    const postList = posts.length ? (
      posts.map(post => {
        return (
          <div className="post card" key={post.id}>
              <img src={Pokeball} alt="a pokeball" />
            <div className="card-content">
              <Link to={'/posts/' + post.id}>
                <span className="card-title red-text">{post.title}</span>
              </Link>
              <p>{post.body}</p>
            </div>
          </div>
        )
      })
    ) : (
      <div className="center">No posts to show</div>
    );

    return (
      <div>
        <div className="container">
          <h4 className="center">Home</h4>
          {postList}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // this will take data from the state
  // and put it into the component props
  return {
    // will create props.posts on the component
    // from the state.posts
    posts : state.posts
  }
}

export default connect(mapStateToProps)(Home)

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
load site: only 3 posts

now let's handle the click on posts
so in Post page, remove state + componentDidMount
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
Post.js:
========
import React, { Component } from 'react'
import { connect } from 'react-redux';
// connects is a fucn which return HOC 

class Post extends Component {

  render() {

    const post = this.props.post ? (
      <div className="post">
        <h4 className="center">{this.props.post.title}</h4>
        <p>{this.props.post.body}</p>
      </div>
    ) : (
      <div className="center">Loading post...</div>
    );

    return (
      <div className="container">
        {post}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // own props is the original props of the component
  let id = ownProps.match.params.post_id // look in App.js route parameter

  // this will take data from the state
  // and put it into the component props
  return {
    // will create props.posts on the component
    // from the state.posts
    post : state.posts.find(p => p.id == id)
  }
}

export default connect(mapStateToProps)(Post)
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
now clicking on post will open the page wit the post

now let's find a way to delete:
dispatch
add button
  
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
Post.js:
========
import React, { Component } from 'react'
import { connect } from 'react-redux';
// connects is a fucn which return HOC 

class Post extends Component {

  handleClick = () => {
    this.props.deletePost(this.props.post.id);
    this.props.history.push('/')
  }
  render() {
    console.log(this.props) // show delete func
    const post = this.props.post ? (
      <div className="post">
        <h4 className="center">{this.props.post.title}</h4>
        <p>{this.props.post.body}</p>
        <div className="center">
          <button className="btn gray" onClick={this.handleClick}>
            DELETE POST
          </button>
        </div>
      </div>
    ) : (
      <div className="center">Loading post...</div>
    );

    return (
      <div className="container">
        {post}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // own props is the original props of the component
  let id = ownProps.match.params.post_id // look in App.js route parameter

  // this will take data from the state
  // and put it into the component props
  return {
    // will create props.posts on the component
    // from the state.posts
    post : state.posts.find(p => p.id == id)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deletePost: (id) => { dispatch({type:'DELETE_POST',
                          id: id})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)

rootReducer.js:
===============
const initState = {
    posts: [
        {
            "id": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
          },
          {
            "id": 2,
            "title": "qui est esse",
            "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
          },
          {
            "id": 3,
            "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
            "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
          }

    ]
}
const rootReducer = (state = initState, action) => {
    console.log(action) // show in console
    // let's delete it from the state
    if (action.type == 'DELETE_POST') {
        let new_posts = state.posts.filter(p => p.id != action.id)
        return {
            ...state,
            posts:new_posts
        }
    }
    return state;

};

export default rootReducer  
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  

action creators:
create actions folder (under src)
create postActions.js
  
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
postActions: (actions folder)
============
  export const deletePost = (id) => { 
    return {type:'DELETE_POST',
            id: id}
}

Post.js
=======
  import React, { Component } from 'react'
import { connect } from 'react-redux';
// connects is a fucn which return HOC 
import { deletePost} from './../actions/postActions';

class Post extends Component {

  handleClick = () => {
    this.props.deletePost(this.props.post.id);
    this.props.history.push('/')
  }
  render() {
    console.log(this.props) // show delete func
    const post = this.props.post ? (
      <div className="post">
        <h4 className="center">{this.props.post.title}</h4>
        <p>{this.props.post.body}</p>
        <div className="center">
          <button className="btn gray" onClick={this.handleClick}>
            DELETE POST
          </button>
        </div>
      </div>
    ) : (
      <div className="center">Loading post...</div>
    );

    return (
      <div className="container">
        {post}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // own props is the original props of the component
  let id = ownProps.match.params.post_id // look in App.js route parameter

  // this will take data from the state
  // and put it into the component props
  return {
    // will create props.posts on the component
    // from the state.posts
    post : state.posts.find(p => p.id == id)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deletePost: (id) => { dispatch(deletePost(id))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
