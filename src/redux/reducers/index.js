import { combineReducers } from "redux";
import items from "./items";
import authentication from "./authentication";

export default combineReducers({ items, authentication });
