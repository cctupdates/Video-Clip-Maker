import React from "react";
import Main from "./Components/Main.js";
import store from "./store";
import { Provider } from "react-redux";

function App() {
    return (
        <Provider store={store}>
            <div className="app">
                <Main />
            </div>
        </Provider>
    );
}

export default App;
