import { createSlice } from "@reduxjs/toolkit";
export type dueTimeDataType = {
  id?: string;
  listId?: string;
  dueTime?: any;
};
const defaultData: dueTimeDataType = {
  id: "",
  listId: "",
  dueTime: new Date(),
};
const initialState = {
  isShow: false,

  data: defaultData,
};
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalIsShow: (state, action) => {
      state.isShow = action.payload;
    },

    setModalData: (state, action) => {
    
      state.data = action.payload;
    },
  },
});

export const { setModalIsShow, setModalData } =
  modalSlice.actions;

export default modalSlice.reducer;
