import { createElement } from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(createElement(App));
