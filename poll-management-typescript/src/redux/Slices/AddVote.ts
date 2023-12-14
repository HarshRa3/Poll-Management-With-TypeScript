import { createSlice } from "@reduxjs/toolkit";
import Instance from "../Axios/Instance";
import { dispatch } from "../store";

const initialState = {
  loading: false,
  isError: false,
  isSuccess: false,
  data: [],
};

const AddVote = createSlice({
  name: "AddVote",
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

export const AddVoteApi =(VoteId,VoteOptionText,header)=>  async () => {
  dispatch(startLoading());
  try {
    let response = await Instance.get(
        `do_vote?id=${VoteId}&option_text=${VoteOptionText}`, header
    );
    dispatch(AddVote.actions.getSuccess(response.data));
  } catch (e) {
    dispatch(AddVote.actions.hasError(e));
  }
};
export const { startLoading, loginSuccessful, hasError, resetReducer } =
  AddVote.actions;

export default AddVote.reducer;
