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

const AddOption = createSlice({
  name: "AddOption",
  initialState: initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.isError = false;
    },
    getSuccess: (state, action:PayloadAction<string[]>) => {
      state.loading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data ={ ...action.payload };
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

export const AddOptionApi =(OptionId:string,OptionData:string)=>  async (dispatch:AppDispatch) => {
  dispatch(startLoading());
  try {
    let response = await Instance.post(`add_new_option?id=${OptionId}&option_text=${OptionData}`)
    dispatch(AddOption.actions.getSuccess(response.data));
  } catch (e) {
    console.log(e);
     
  }
};
export const { startLoading, getSuccess, hasError, resetReducer } =
  AddOption.actions;

export default AddOption.reducer;
