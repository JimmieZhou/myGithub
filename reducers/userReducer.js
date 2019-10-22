/*
 * @Descripttion: userReducer
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-22 11:50:14
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-22 13:49:15
 */
import { LOGOUT } from "../constant/userConstant";
const userInitialState = {};
const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return {};
    default:
      return state;
  }
};
export default userReducer;
