/*
 * @Descripttion: next的入口页面
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-14 09:36:53
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-15 16:22:03
 */
import { connect } from "react-redux";
const Index = ({ counter, username,reName,add }) => (
  <div>
    Index,counter:{counter},username:{username}
    <input type="text" onChange={e=>reName(e.target.value)}></input>
    <button onClick={()=>add()}>+</button>
  </div>
);

export default connect(
  function mapStateToProps(state) {
    return {
      counter: state.counter.count,
      username: state.user.username
    };
  },
  function mapDispatchToProps(dispatch) {
    return {
      add: () => dispatch({ type: "ADD" }),
      reName: username => dispatch({ type: "UPDATE_USERNAME", username })
    };
  }
)(Index);
