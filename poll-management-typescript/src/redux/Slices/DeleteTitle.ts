import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Instance from "../Axios/Instance";
import { AppDispatch } from "../store";
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

const DeleteTitle = createSlice({
  name: "DeleteTitle",
  initialState: initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.isError = false;
    },
    loginSuccessful: (state, action:PayloadAction<string[]>) => {
      state.loading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = { ...action.payload };
    },
    hasError: (state, action:PayloadAction<string[]>) => {

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

export const DeleteTitleApi = (payload:string) => async (dispatch:AppDispatch) => {
  dispatch(startLoading());
  try {
    let response = await Instance.delete(
      `delete_poll?id=${payload}`
    );
    dispatch(loginSuccessful(response.data));
  } catch (e) {
    console.log(e);
    
  }
};

export const { startLoading, loginSuccessful, hasError, resetReducer } =
  DeleteTitle.actions;

export default DeleteTitle.reducer;
