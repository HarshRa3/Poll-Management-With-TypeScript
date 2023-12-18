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

const EditTitle = createSlice({
  name: "EditTitle",
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

export const EditTitleApi = (titleId:string, titleData:string) => async (dispatch:AppDispatch) => {
  dispatch(startLoading());
  try {
    let response = await Instance.post(
      `update_poll_title?id=${titleId}&title=${titleData}`
    );
    dispatch(loginSuccessful(response.data));
    console.log(response.data);
  } catch (e) {
    console.log(e);
    
  }
};

export const { startLoading, loginSuccessful, hasError, resetReducer } =
  EditTitle.actions;

export default EditTitle.reducer;
