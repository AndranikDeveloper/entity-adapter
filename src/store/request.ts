import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
import { ICommentsData } from '../types/data-types';

export const dataApi: AsyncThunk<ICommentsData[], void, { state: RootState }> =
  createAsyncThunk('dataApi', async () => {
    const resp = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_limit=10`
    );
    const data = await resp.json();
    return data;
  });
