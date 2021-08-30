import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Dispatch, ReducerAction } from 'react';
import { fetchReposForUser } from './helpers/fetchReposForUser';
import { fetchUsers } from './helpers/fetchUsers';
import { Repo } from './types/repo';

export const reposSlice = createSlice({
  name: 'repos',
  initialState: {
    data: {},
    error: '',
    isLoading: false,
  },
  reducers: {
    setLoading: state => {
      state.isLoading = !state.isLoading;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setData: (state, action: { type: string, payload: { id: number, response: Repo[] } }) => {
      console.log(action.payload);
      state.data = { ...state.data, [action.payload.id]: action.payload.response };
    }
  }
});

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    error: '',
    isLoading: false,
  },
  reducers: {
    setLoading: state => {
      state.isLoading = !state.isLoading;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload
    }
  }
});

export const fetchUsersByName = (username: string) =>
  async (dispatch: Dispatch<ReducerAction<any>>) => {
    const response = await fetchUsers(username);
    dispatch({ type: 'users/setData', payload: response.items })
  };

export const fetchReposByUser = (user: { id: number, login: string }) =>
  async (dispatch: Dispatch<ReducerAction<any>>) => {
    const response = await fetchReposForUser(user.login);
    dispatch({ type: 'repos/setData', payload: { id: user.id, response: response } })
  };

export const { setData, setError, setLoading } = usersSlice.actions;


export const store = configureStore({
  reducer: {
    repos: reposSlice.reducer,
    users: usersSlice.reducer
  },
});

