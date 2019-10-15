/*
 * @Descripttion: 页面b
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-14 11:34:26
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-15 11:03:07
 */
import {
  useState,
  useEffect,
  useLayoutEffect,
  useReducer,
  useContext,
  useRef,
  memo,
  useMemo,
  useCallback
} from "react";

import myContext from "../lib/my-context";
import { Input } from "antd";

const countReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return state + 1;
    case "minus":
      return state - 1;
    default:
      return state;
  }
};

const UseState = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return <div>{count}</div>;
};

const UseReducer = () => {
  const [count, dispatch] = useReducer(countReducer, 0);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "add" });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return <div>{count}</div>;
};

// 当没有依赖项时，执行顺序是：先执行invoked；当有任何更新时，首先执行defected，然后打印invoked.
// 当依赖项是[]时，表示只是在首次渲染时会执行打印invoked；有任何更新都不会再执行
// 当依赖项是具体某个变量时，执行顺序是：先打印invoked；只有对应的变量改变后，才会执行打印，首先打印defected，然后打印invoked.
const UseEffect = () => {
  const [name, setName] = useState("jimmie");
  const [count, setCount] = useState(0);
  const inputRef = useRef();
  useEffect(() => {
    console.log("effect invoked");
    console.log(inputRef);
    return () => {
      console.log("effect defected");
    };
  }, [count]);
  return (
    <div>
      <div>name:{name}</div>
      <div>count:{count}</div>
      <input
        type="text"
        ref={inputRef}
        onChange={e => setName(e.target.value)}
      ></input>
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </div>
  );
};

// 优先于useEffect执行，UseLayoutEffect会在依赖的属性更新后，会在渲染成don节点之前执行，一般不用，建议用UseEffect
const UseLayoutEffect = () => {
  const [name, setName] = useState("jimmie");
  const [count, setCount] = useState(0);
  useLayoutEffect(() => {
    console.log("effect layout invoked");
    return () => {
      console.log("effect layout defected");
    };
  }, [count]);
  return (
    <div>
      <div>name:{name}</div>
      <div>count:{count}</div>
      <input type="text" onChange={e => setName(e.target.value)}></input>
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </div>
  );
};

const UseContext = () => {
  const ctx = useContext(myContext);
  return <div>{ctx}</div>;
};

// -------------------------------------------- hooks优化 -----------------------------------------------------
// 同时搭配memo，useMemo,useCallback使用
const Child = memo(({ onBtnClick, config }) => {
  console.log("child render");
  return (
    <button onClick={onBtnClick} style={{ color: config.color }}>
      {config.text}
    </button>
  );
});
const MyCountFunc = () => {
  const [count, dispatch] = useReducer(countReducer, 0);
  const [name, setName] = useState("jimmie");
  const config = useMemo(
    () => ({
      text: `count is ${count}`,
      color: count > 3 ? "red" : "black"
    }),
    [count]
  );
  // useCallback相当于是简化版的useMemo，转为函数设计
  const handelBtnClick = useCallback(() => dispatch({ type: "add" }), []);
  return (
    <div>
      <Input value={name} onChange={e => setName(e.target.value)}></Input>
      <Child config={config} onBtnClick={handelBtnClick}></Child>
    </div>
  );
};

export default () => (
  <>
    <UseState></UseState>
    <UseReducer></UseReducer>
    <UseEffect></UseEffect>
    <UseLayoutEffect></UseLayoutEffect>
    <UseContext></UseContext>
    <MyCountFunc></MyCountFunc>
  </>
);
