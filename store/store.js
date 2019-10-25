/*
 * @Descripttion: 全局store
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-15 11:41:08
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-25 13:38:43
 */
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "axios";
import allReducers from "../reducers/index";
import { LOGOUT } from "../constant/userConstant";

const userInitialState = {};

export function logout() {
  return dispatch => {
    axios
      .post("/logout")
      .then(resp => {
        if (resp.status === 200) {
          dispatch({
            type: LOGOUT
          });
        } else {
          console.log("logout failed...", resp);
        }
      })
      .catch(err => {
        console.log("logout failed...", err);
      });
  };
}

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
