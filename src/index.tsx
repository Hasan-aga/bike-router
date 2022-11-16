import React from "react";
import ReactDOM from "react-dom/client";
import "./index";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import useVH from "react-viewport-height";

if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("there is no element with id `root`!");
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
