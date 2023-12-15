import { createSlice } from "@reduxjs/toolkit";
import Instance from "../Axios/Instance";
import { AppDispatch} from "../store";

interface LoginState {
  loading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: string[] ;
}

const initialState:LoginState = {
  loading: false,
  isError: false,
  isSuccess: false,
  data: [],
};

const AdminPoll = createSlice({
  name: "AdminPoll",
  initialState: initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.isError = false;
    },
    getSuccess: (state, action) => {
      state.loading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data =action.payload.data.reverse();
    },
    hasError: (state, action) => {
      state.loading = false;
      state.isError = true;
      state.isSuccess = false;
      state.data = action.payload;
    },
    resetReducer(state) {
      state.isError = false;
      state.loading = false;
      state.isSuccess = false;
      state.data = [];
    },
  },
});

export const AdminPollApi =()=>  async (dispatch:AppDispatch) => {
  dispatch(startLoading());
  try {
    let response = await Instance.post(
      `list_polls`
    );
    dispatch(AdminPoll.actions.getSuccess(response.data));
  } catch (e:any) {
    dispatch(AdminPoll.actions.hasError(e));
  }
};
export const { startLoading, getSuccess, hasError, resetReducer } =
  AdminPoll.actions;

export default AdminPoll.reducer;
