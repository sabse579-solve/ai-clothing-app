import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// ✅ ADD THESE TWO LINES
import axios from "axios";
axios.defaults.baseURL = "";

ReactDOM.createRoot(document.getElementById("root")).render(

    <App />
  
);

