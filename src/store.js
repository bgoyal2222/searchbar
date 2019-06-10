import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import repos from "./Components/HomePage/reducers";
import thunk from 'redux-thunk';



const store = applyMiddleware(thunk)(createStore)(combineReducers({
    repos
}));

export default store