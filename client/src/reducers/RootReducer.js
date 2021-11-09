import { combineReducers } from "redux";
import userReducer from "./userReducer";
import reminderReducer from "./reminderReducer";

const RootReducer = combineReducers({
  user: userReducer, //user
  reminder: reminderReducer,
});

const rootReducer = (state, action) =>
  RootReducer(action.type === "Logout" ? undefined : state, action);
export default rootReducer;
