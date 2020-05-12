import {combineReducers} from "redux";
import {globalReducer} from "./globalReducer";
import {navigateReducer} from "./navigateReducer";

export default combineReducers({
    global: globalReducer,
    navigate: navigateReducer,
})
