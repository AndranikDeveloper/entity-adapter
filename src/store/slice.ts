import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { ICommentsData } from '../types/data-types';
import { dataApi } from './request';
import { RootState } from './store';

const dataAdapter = createEntityAdapter({
  selectId: (data: ICommentsData) => data.id,
  // sortComparer: (a, b) => a.name.localeCompare(b.name),

  // compare the two string which was given and returns the -1 if
  // the first item comes first than second, if returns 1 so opposite, but if 0 this means there are equal
});

const dataSlice = createSlice({
  name: 'dataSlice',
  initialState: dataAdapter.getInitialState({ loading: false, error: '' }),
  reducers: {
    deleteComment(state, { payload }) {
      dataAdapter.removeOne(state, payload);
    },
    updateComment(state, { payload }) {
      const { id, editValue } = payload;
      dataAdapter.updateOne(state, { id: id, changes: { name: editValue } });
    },
    addComment(state, { payload }) {
      dataAdapter.addOne(state, payload);
    },
    removeComments(state) {
      dataAdapter.removeAll(state);
    },
    removeSelected(state, { payload }) {
      dataAdapter.removeMany(state, payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(dataApi.fulfilled, (state, { payload }) => {
        dataAdapter.setAll(state, payload);
        state.loading = false;
        state.error = '';
      })
      .addCase(dataApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(dataApi.rejected, (state) => {
        state.error = 'some error ';
        state.loading = false;
      });
  },
});

export const dataSelectors = dataAdapter.getSelectors(
  (state: RootState) => state.dataSlice
);
// const allBooks = dataAdapter.(store.getState());

export const {
  deleteComment,
  updateComment,
  addComment,
  removeComments,
  removeSelected,
} = dataSlice.actions;
export default dataSlice.reducer;
