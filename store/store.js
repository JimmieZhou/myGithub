/*
 * @Descripttion: store
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-15 11:41:08
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-17 14:16:46
 */
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "axios";
const LOGOUT = "LOGOUT";
const userInitialState = {};
function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case LOGOUT:
      return {};
    default:
      return state;
  }
}

export const logout = () => {
  return dispatch => {
    axios
      .post("/logout")
      .then(resp => {
        if (resp.status === 200) {
          dispatch({
            type: LOGOUT
          });
        } else {
          console.log("logout failed", resp);
        }
      })
      .catch(err => {
        console.log("logout failed", err);
      });
  };
};

const allReducers = combineReducers({
  user: userReducer
});

export default function initializeStore(state) {
  const store = createStore(
    allReducers,
    Object.assign(
      {},
      {
        user: userInitialState
      },
      state
    ),
    composeWithDevTools(applyMiddleware(ReduxThunk))
  );

  return store;
}
