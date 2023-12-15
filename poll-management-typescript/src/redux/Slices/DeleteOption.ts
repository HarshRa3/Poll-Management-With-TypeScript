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

const DeleteOption = createSlice({
  name: "DeleteOption",
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

export const DeleteOptionApi = (optionInd:string, optionText:string) => async (dispatch:AppDispatch) => {
  dispatch(startLoading());
  try {
    let response = await Instance.post(
      `delete_poll_option?id=${optionInd}&option_text=${optionText}`
    );
    dispatch(loginSuccessful(response.data));
    console.log(response.data);
  } catch (e:any) {
    dispatch(hasError(e));
  }
};

export const { startLoading, loginSuccessful, hasError, resetReducer } =
  DeleteOption.actions;

export default DeleteOption.reducer;
