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
