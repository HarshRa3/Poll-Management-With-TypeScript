import { createSlice } from "@reduxjs/toolkit";
import Instance from "../Axios/Instance";

const initialState = {
  loading: false,
  isError: false,
  isSuccess: false,
  data: {},
};

const DeleteOption = createSlice({
  name: "DeleteOption",
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

export const DeleteOptionApi = (optionInd, optionText) => async (dispatch) => {
  dispatch(startLoading());
  try {
    let response = await Instance.post(
      `delete_poll_option?id=${optionInd}&option_text=${optionText}`
    );
    dispatch(loginSuccessful(response.data));
    console.log(response.data);
  } catch (e) {
    dispatch(hasError(e));
  }
};

export const { startLoading, loginSuccessful, hasError, resetReducer } =
  DeleteOption.actions;

export default DeleteOption.reducer;
