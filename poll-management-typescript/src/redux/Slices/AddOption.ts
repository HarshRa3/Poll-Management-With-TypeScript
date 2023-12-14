import { createSlice } from "@reduxjs/toolkit";
import Instance from "../Axios/Instance";

const initialState = {
  loading: false,
  isError: false,
  isSuccess: false,
  data: [],
};

const AddOption = createSlice({
  name: "AddOption",
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
      state.data ={ ...action.payload };
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

export const AddOptionApi =(OptionId,OptionData)=>  async (dispatch) => {
  dispatch(startLoading());
  try {
    let response = await Instance.post(`add_new_option?id=${OptionId}&option_text=${OptionData.option}`)
    dispatch(AddOption.actions.getSuccess(response.data));
  } catch (e) {
    dispatch(AddOption.actions.hasError(e));
  }
};
export const { startLoading, loginSuccessful, hasError, resetReducer } =
  AddOption.actions;

export default AddOption.reducer;
