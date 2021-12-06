import { combineReducers } from "redux";
import userReducer from "./userReducer";
import reminderReducer from "./reminderReducer";
import medicationReducer from "./medicationReducer";

const RootReducer = combineReducers({
  user: userReducer, //user
  reminder: reminderReducer,
  medication: medicationReducer,
});

const rootReducer = (state, action) =>
  RootReducer(action.type === "Logout" ? undefined : state, action);
export default rootReducer;
