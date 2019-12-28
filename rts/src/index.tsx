import * as React from "react";
import * as ReactDOM from "react-dom";
import './assets/styles/index.less'
import Hello from "./views/app";

type ComponentName = typeof Hello;

ReactDOM.render(
  <Hello introduce="Hello, Development" />,
  document.getElementById("root")
);
