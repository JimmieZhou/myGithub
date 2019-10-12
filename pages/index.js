/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-24 15:36:21
 * @LastEditTime: 2019-09-29 17:30:07
 * @LastEditors: Please set LastEditors
 */
import { connect } from "react-redux";

const Index = ({ countReducer, userReducer, add, rename }) => {
  return (
    <>
      <p>count:{countReducer.count}</p>
      <p>userName:{userReducer.name}</p>
      <input
        value={userReducer.name}
        onChange={e => rename(e.target.value)}
      ></input>
      <button onClick={() => add()}>+</button>
    </>
  );
};

Index.getInitialProps = async ({ reduxStore }) => {
  reduxStore.dispatch({type:'ADD'})
  return {}
};

export default connect(
  function mapStateToProps(state) {
    const { countReducer, userReducer } = state;
    return {
      countReducer,
      userReducer
    };
  },
  function mapDispatchToProps(dispatch) {
    return {
      add: () => dispatch({ type: "ADD" }),
      rename: name => dispatch({ type: "UPDATE_USER", name })
    };
  }
)(Index);
