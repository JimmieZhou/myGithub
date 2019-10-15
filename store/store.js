/*
 * @Descripttion: store
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-15 11:41:08
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-15 16:21:06
 */
import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const initialState = {
  count: 0,
}

const userInitialState = {
  username: 'jimmie',
}

const ADD = 'ADD'
function counterReducer(state = initialState, action) {
  // console.log(state, action)
  switch (action.type) {
    case ADD:
      return { count: state.count + (action.num || 1) }
    default:
      return state
  }
}

const UPDATE_USERNAME = 'UPDATE_USERNAME'
function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case UPDATE_USERNAME:
      return {
        ...state,
        username: action.username,
      }
    default:
      return state
  }
}

const allReducers = combineReducers({
  counter: counterReducer,
  user: userReducer,
})

// action creatore
export function add(num) {
  return {
    type: ADD,
    num,
  }
}

function addAsync(num) {
  return dispatch => {
    setTimeout(() => {
      dispatch(add(num))
    }, 1000)
  }
}

export default function initializeStore(state) {
  const store = createStore(
    allReducers,
    Object.assign(
      {},
      {
        counter: initialState,
        user: userInitialState,
      },
      state,
    ),
    composeWithDevTools(applyMiddleware(ReduxThunk)),
  )

  return store
}
