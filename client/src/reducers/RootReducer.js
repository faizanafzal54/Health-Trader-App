import { combineReducers } from "redux";
import userReducer from "./userReducer";
import reminderReducer from "./reminderReducer";
import medicationReducer from "./medicationReducer";
import circleReducer from "./circleReducer";

const RootReducer = combineReducers({
  user: userReducer, //user
  reminder: reminderReducer,
  medication: medicationReducer,
  circle: circleReducer,
});

const rootReducer = (state, action) =>
  RootReducer(action.type === "Logout" ? undefined : state, action);
export default rootReducer;
