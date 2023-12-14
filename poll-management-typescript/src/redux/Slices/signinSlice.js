import { createSlice } from "@reduxjs/toolkit";
import  { dispatch } from "../store";
import Instance from "../Axios/Instance";

const initialState = {
  loading: false,
  isError: false,
  isSuccess: false,
  data: [],
};

const signIn = createSlice({
  name: "signin",
  initialState: initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.isError = false;
    },
    loginSuccessful: (state, action) => {
      state.loading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = { ...action.payload };
    },
    hasError: (state, action) => {
      state.loading = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = action.payload;
    },
    resetReducer(state) {
      state.isError = false;
      state.loading = false;
      state.isSuccess = false;
      state.data = {};
    },
  },
});

export const signInApi = async (payload) => {
  dispatch(startLoading());
  try {
    let response = await Instance.post(
      `login?username=${payload.name}&password=${payload.password}`
    );
    dispatch(signIn.actions.loginSuccessful(response.data));
  } catch (e) {
    dispatch(signIn.actions.hasError(e));
  }
};
export const { startLoading, loginSuccessful, hasError, resetReducer } =
  signIn.actions;

export default signIn.reducer;
