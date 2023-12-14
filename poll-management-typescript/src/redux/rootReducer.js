import { combineReducers } from "@reduxjs/toolkit";
import signUp from "./Slices/signupSlice";
import signIn from "./Slices/signinSlice";
import AdminPoll from "./Slices/AdminPoll";
import DeleteOption from "./Slices/DeleteOption";
import DeleteTitle from "./Slices/DeleteTitle";
import AddPoll from "./Slices/AddPoll";
import AddOption from "./Slices/AddOption";
import EditTitle from "./Slices/EditTitle";
const rootReducer = combineReducers({
  signUp: signUp,
  signIn: signIn,
  AdminPoll: AdminPoll,
  DeleteOption: DeleteOption,
  DeleteTitle: DeleteTitle,
  AddPoll: AddPoll,
  AddOption: AddOption,
  EditTitle:EditTitle,
  });
export default rootReducer;
