import { applyMiddleware, compose, createStore } from "redux";
import reducer from "../reducer";
import Thunk from './../middleWere';
const composer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose
export default createStore(reducer,composer(applyMiddleware(Thunk)))