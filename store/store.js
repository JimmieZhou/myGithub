/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-29 14:19:03
 * @LastEditTime: 2019-09-29 17:03:25
 * @LastEditors: Please set LastEditors
 */
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const initialCounterState = {
  count: 0
};
const initialUserState = {
  name: "zjy"
};
const ADD = "ADD";
const UPDATE_USER = "UPDATE_USER";

const countReducer = (state = initialCounterState, action) => {
  switch (action.type) {
    case ADD:
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return { ...state, name: action.name };
    default:
      return state;
  }
};

const allReducers = combineReducers({
  countReducer,
  userReducer
});

const store = createStore(
  allReducers,
  {
    countReducer: initialCounterState,
    userReducer: initialUserState
  },
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

// 在每一次dispatch之前就会执行
store.subscribe(() => {
  console.log("changed", store.getState());
});
store.dispatch({ type: ADD });
store.dispatch({ type: UPDATE_USER, name: "zhoujingyuan" });

export default function initializeStore(state) {
  const store = createStore(
    allReducers,
    Object.assign(
      {},
      {
        countReducer: initialCounterState,
        userReducer: initialUserState
      },
      state
    ),
    composeWithDevTools(applyMiddleware(ReduxThunk))
  );
  return store;
}
