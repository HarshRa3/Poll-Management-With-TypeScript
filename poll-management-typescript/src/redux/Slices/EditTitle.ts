import { createSlice } from "@reduxjs/toolkit";
import Instance from "../Axios/Instance";
import { dispatch } from "../store";

const initialState = {
  loading: false,
  isError: false,
  isSuccess: false,
  data: {},
};

const EditTitle = createSlice({
  name: "EditTitle",
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

export const EditTitleApi = (titleId, titleData) => async () => {
  dispatch(startLoading());
  try {
    let response = await Instance.post(
      `update_poll_title?id=${titleId}&title=${titleData}`
    );
    dispatch(loginSuccessful(response.data));
    console.log(response.data);
  } catch (e) {
    dispatch(hasError(e));
  }
};

export const { startLoading, loginSuccessful, hasError, resetReducer } =
  EditTitle.actions;

export default EditTitle.reducer;
