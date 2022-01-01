import { combineReducers } from "redux";
import moviesReducer from "./moviesReducer";
import showsReducer from "./showsReducer";

export default combineReducers({
   movies: moviesReducer,
   shows: showsReducer

    
})