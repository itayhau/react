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
so nbow we also have posts
  
  
  
  
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
