/**
 * 该容器组件功能为实现传入一个标签或者一个组件作为参数，克隆该组件并扩展该标签或者组件的props
 */
import { cloneElement } from "react";

const style = {
  width: "100%",
  maxWidth: 1200,
  marginLeft: "auto",
  marginRight: "auto",
  paddingLeft: 20,
  paddingRight: 20
};

export default ({ children, renderer = <div /> }) => {
  const newElement = cloneElement(renderer, {
    style: Object.assign({}, renderer.props.style, style),
    children
  });
  return newElement;
};
