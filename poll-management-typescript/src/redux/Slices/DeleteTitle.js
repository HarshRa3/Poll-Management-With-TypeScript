import { createSlice } from "@reduxjs/toolkit";
import Instance from "../Axios/Instance";

const initialState = {
  loading: false,
  isError: false,
  isSuccess: false,
  data: {},
};

const DeleteTitle = createSlice({
  name: "DeleteTitle",
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

export const DeleteTitleApi = (payload) => async (dispatch) => {
  dispatch(startLoading());
  try {
    let response = await Instance.delete(
      `delete_poll?id=${payload}`
    );
    dispatch(loginSuccessful(response.data));
  } catch (e) {
    dispatch(hasError(e));
  }
};

export const { startLoading, loginSuccessful, hasError, resetReducer } =
  DeleteTitle.actions;

export default DeleteTitle.reducer;
