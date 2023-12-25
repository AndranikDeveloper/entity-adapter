import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { IComentsData } from "../types/data-types";
import { dataApi } from "./request";
import { RootState } from "./store";

const dataAdapter = createEntityAdapter({
  selectId: (data: IComentsData) => data.id,
});

const dataSlice = createSlice({
  name: "dataSlice",
  initialState: dataAdapter.getInitialState({ loading: false, error: "" }),
  reducers: {
    deleteComment(state, { payload }) {
      dataAdapter.removeOne(state, payload);
    },
    updateComment(state, { payload }) {
      const { id, value } = payload;
      dataAdapter.updateOne(state, { id: id, changes: { name: value } });
      console.log("assss");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(dataApi.fulfilled, (state, { payload }) => {
        dataAdapter.setAll(state, payload);
      })
      .addCase(dataApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(dataApi.rejected, (state) => {
        state.error = "some error ";
      });
  },
});

export const dataSelectors = dataAdapter.getSelectors(
  (state: RootState) => state.dataSlice
);

export const { deleteComment, updateComment } = dataSlice.actions;
export default dataSlice.reducer;
