import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/StoreProvider';
import { User } from '@/enteties/User';
import { fetchAllUsers } from '@/enteties/User/model/services/getAllUsers';
import { UsersSchema } from '@/enteties/User/model/types/users';

export const usersAdapter = createEntityAdapter({
  selectId: (user: User) => user._id,
});

export const getUsers = usersAdapter.getSelectors<StateSchema>(
  (state) => state.users || usersAdapter.getInitialState(),
);

export const usersSlice = createSlice({
  name: 'usersSlice',
  initialState: usersAdapter.getInitialState<UsersSchema>({
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    totalUsers: 0,

    // pagination
    limit: 5,
    offset: 0,

    search: '',

    _inited: false,
  }),
  reducers: {
    setSearchString: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload;
    },
    clearSortParams: (state) => {
      state.search = '';
    },
    initState: (state) => {
      state._inited = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;

        if (action.meta.arg.replace) {
          usersAdapter.removeAll(state);
        }
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;

        usersAdapter.setAll(state, action.payload.users);
        state.totalUsers = action.payload.count;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.toString();
      });
  },
});

export const { reducer: usersReducer, actions: usersActions } = usersSlice;
