/*
 * @Descripttion: reducers
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-22 13:46:16
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-22 13:56:50
 */
import { combineReducers } from "redux";
import userReducer from "./userReducer";
const allReducers = combineReducers({
  user: userReducer
});
export default allReducers;
