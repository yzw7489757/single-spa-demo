import * as React from "node_modules/@types/react";
import * as ReactDOM from "node_modules/@types/react-dom";
import './assets/styles/index.less'
import Hello from "./views/app";

type ComponentName = typeof Hello;

ReactDOM.render(
  <Hello introduce="Hello, Development" />,
  document.getElementById("root")
);
