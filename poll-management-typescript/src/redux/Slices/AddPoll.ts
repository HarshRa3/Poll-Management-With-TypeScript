import { createSlice } from "@reduxjs/toolkit";
import Instance from "../Axios/Instance";
import { dispatch } from "../store";

const initialState = {
  loading: false,
  isError: false,
  isSuccess: false,
  data: {},
};

const AddPoll = createSlice({
  name: "AddPoll",
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

export const AddPollApi = (payload, newOption) => async () => {
  dispatch(AddPoll.actions.startLoading());
  try {
    if (newOption.length === 1) {
      let response = await Instance.post(
        `add_poll?title=${payload.title}&options=${newOption[0].option}`
      );

      dispatch(AddPoll.actions.loginSuccessful(response.data));
    } else if (newOption.length === 2) {
      let response = await Instance.post(
        `add_poll?title=${payload.title}&options=${newOption[0].option}____${newOption[1].option}`
      );
      dispatch(AddPoll.actions.loginSuccessful(response.data));
    } else if (newOption.length === 3) {
      let response = await Instance.post(
        `add_poll?title=${payload.title}&options=${newOption[0].option}____${newOption[1].option}____${newOption[2].option}`
      );
      dispatch(AddPoll.actions.loginSuccessful(response.data));
    } else if (newOption.length === 4) {
      let response = await Instance.post(
        `add_poll?title=${payload.title}&options=${newOption[0].option}____${newOption[1].option}____${newOption[2].option}____${newOption[3].option}`
      );
      dispatch(AddPoll.actions.loginSuccessful(response.data));
    }
  } catch (e) {
    dispatch(hasError(e));
  }
};

export const { startLoading, loginSuccessful, hasError, resetReducer } =
  AddPoll.actions;

export default AddPoll.reducer;
