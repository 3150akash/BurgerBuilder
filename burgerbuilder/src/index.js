import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware,compose,combineReducers } from 'redux';
import thunk from 'redux-thunk'
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/Auth';

//production mode to block 
const composeEnhancers =process.env.NODE_ENV ==='development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :null|| compose;


const RootReducer = combineReducers({
    burgerBuilder:burgerBuilderReducer,
    order:orderReducer,
    auth:authReducer
})
const store=createStore(RootReducer,composeEnhancers(
    applyMiddleware(thunk)
    ));

const app = (
    <Provider store={store}>
        <BrowserRouter> {/*basename property needs to be added  example www.sss.comc/default/ */}
            <App />
        </BrowserRouter>
    </Provider>

)

ReactDOM.render(app, document.getElementById('root'));


serviceWorker.unregister();
