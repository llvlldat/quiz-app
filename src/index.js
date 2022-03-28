import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "antd/dist/antd.css";
import ContextProvider from "./context/Context";
import "./api/api-config";

ReactDOM.render(
    <ContextProvider>
        <App />
    </ContextProvider>,
    document.getElementById("root")
);
