// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./styles/global.css";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// ReactDOM.render(<App />, document.getElementById("root"));

import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import "./styles/global.css";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
