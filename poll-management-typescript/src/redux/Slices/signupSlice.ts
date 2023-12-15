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

const signUp = createSlice({
  name: "signUp",
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
    signupResetReducer(state) {
      state.isError = false;
      state.loading = false;
      state.isSuccess = false;
      state.data = [];
    },
  },
});

export const signUpApi = (payload:{name:string,password:string,role:string}) => async (dispatch:AppDispatch) => {
  try {
    let response = await Instance.post(
      `add_user?username=${payload.name}&password=${payload.password}&role=${payload.role}`
    );
    dispatch(signUp.actions.loginSuccessful(response.data));
  } catch (e:any) {
    dispatch(signUp.actions.hasError(e));
  }
};
export const { startLoading, loginSuccessful, hasError, signupResetReducer } = signUp.actions;

export default signUp.reducer;
