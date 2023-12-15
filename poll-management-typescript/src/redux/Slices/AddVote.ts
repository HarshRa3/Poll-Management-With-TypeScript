import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Instance from "../Axios/Instance";
import { AppDispatch} from "../store";

interface LoginState {
  loading: boolean;
  isSuccess: boolean;
  isError: boolean;
  // errorMessage:string
  data: string[];
}
interface headerInter {
  
  OptionData : string
  
}
const initialState:LoginState = {
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
    getSuccess: (state, action:PayloadAction<string[]>) => {
      state.loading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data ={ ...action.payload }
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

export const AddVoteApi =(VoteId:any,VoteOptionText:any,header:any)=>  async (dispatch:AppDispatch) => {
  dispatch(startLoading());
  try {
    let response = await Instance.get(
        `do_vote?id=${VoteId}&option_text=${VoteOptionText}`, header
    );
    dispatch(AddVote.actions.getSuccess(response.data));
  } catch (e:any) {
    dispatch(AddVote.actions.hasError(e));
  }
};
export const { startLoading, getSuccess, hasError, resetReducer } =
  AddVote.actions;

export default AddVote.reducer;
