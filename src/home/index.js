import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { StoreProvider  } from "./context/store";

ReactDOM.render(
    <StoreProvider>
        <App/>
    </StoreProvider>,
    document.getElementById('root')
);
