import axios from 'axios';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { IUser, defaultValue, IUserTruncated } from 'app/shared/model/user.model';
import { IQueryParams, serializeAxiosError } from 'app/shared/reducers/reducer.utils';

const initialState = {
  loading: false,
  errorMessage: null,
  users: [] as ReadonlyArray<IUser>,
  authorities: [] as any[],
  user: defaultValue,
  updating: false,
  updateSuccess: false,
  totalItems: 0,
  userHaveChoosePath: false,
  ownerId: '',
  riderId: '',
  truncatedUsed: {} as IUserTruncated,
};

const apiUrl = 'api/users';
const adminUrl = 'api/admin/users';

// Async Actions

export const getTruncatedUser = createAsyncThunk(
  'userManagement/fetch_getTruncatedUser',
  async (ownerId: string) => {
    const requestUrl = `api/getTruncatedUser/${ownerId}`;
    return axios.get<IUserTruncated>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const userIsARiderOrOwner = createAsyncThunk(
  '/userManagement/fetch_userIsARiderOrOwner',
  async (userId: string) => {
    const requestUrl = `api/userIsARiderOrOwner/${userId}`;
    return axios.get<boolean>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const getRiderId = createAsyncThunk(
  'userManagement/fetch_riderId',
  async (userId: string) => {
    const requestUrl = `api/getRiderId/${userId}`;
    return axios.get<string>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const getOwnerId = createAsyncThunk(
  'userManagement/fetch_OwnerId',
  async (userId: string) => {
    const requestUrl = `api/getOwnerId/${userId}`;
    return axios.get<string>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const addOwnerToUser = createAsyncThunk(
  '/userManagement/add_owner_to_user',
  async (userId: string) => {
    const requestUrl = `api/addOwner`;
    const result = await axios.post<string>(requestUrl, userId);
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const addRiderToUser = createAsyncThunk(
  '/userManagement/add_rider_to_user',
  async (userId: string) => {
    const requestUrl = `api/addRider`;
    const result = await axios.post<string>(requestUrl, userId);
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const getUsers = createAsyncThunk('userManagement/fetch_users', async ({ page, size, sort }: IQueryParams) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return axios.get<IUser[]>(requestUrl);
});

export const getUsersAsAdmin = createAsyncThunk('userManagement/fetch_users_as_admin', async ({ page, size, sort }: IQueryParams) => {
  const requestUrl = `${adminUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return axios.get<IUser[]>(requestUrl);
});

export const getRoles = createAsyncThunk('userManagement/fetch_roles', async () => {
  return axios.get<any[]>(`api/authorities`);
});

export const getUser = createAsyncThunk(
  'userManagement/fetch_user',
  async (id: string) => {
    const requestUrl = `${adminUrl}/${'4'}`;
    return axios.get<IUser>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const createUser = createAsyncThunk(
  'userManagement/create_user',
  async (user: IUser, thunkAPI) => {
    const result = await axios.post<IUser>(adminUrl, user);
    thunkAPI.dispatch(getUsersAsAdmin({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const updateUser = createAsyncThunk(
  'userManagement/update_user',
  async (user: IUser, thunkAPI) => {
    const result = await axios.put<IUser>(adminUrl, user);
    thunkAPI.dispatch(getUsersAsAdmin({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const deleteUser = createAsyncThunk(
  'userManagement/delete_user',
  async (id: string, thunkAPI) => {
    const requestUrl = `${adminUrl}/${id}`;
    const result = await axios.delete<IUser>(requestUrl);
    thunkAPI.dispatch(getUsersAsAdmin({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const userIsARider = createAsyncThunk(
  'userManagement/fetch_userIsARider',
  async (userId: string) => {
    const requestUrl = `api/userIsARider/${userId}`;
    return axios.get<boolean>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const userIsAOwner = createAsyncThunk(
  'userManagement/fetch_userIsAOwner',
  async (userId: string) => {
    const requestUrl = `api/userIsAOwner/${userId}`;
    return axios.get<boolean>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export type UserManagementState = Readonly<typeof initialState>;

export const UserManagementSlice = createSlice({
  name: 'userManagement',
  initialState: initialState as UserManagementState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getRoles.fulfilled, (state, action) => {
        state.authorities = action.payload.data;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(deleteUser.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
        state.user = defaultValue;
      })
      .addMatcher(isFulfilled(getTruncatedUser), (state, action) => {
        state.truncatedUsed = action.payload.data;
        state.loading = false;
      })
      .addMatcher(isFulfilled(getRiderId), (state, action) => {
        state.riderId = action.payload.data;
        state.loading = false;
      })
      .addMatcher(isFulfilled(getOwnerId), (state, action) => {
        state.ownerId = action.payload.data;
        state.loading = false;
      })
      .addMatcher(isFulfilled(userIsARiderOrOwner), (state, action) => {
        state.userHaveChoosePath = action.payload.data;
        state.loading = false;
      })
      .addMatcher(isFulfilled(addOwnerToUser, addRiderToUser), (state, action) => {})
      .addMatcher(isFulfilled(getUsers, getUsersAsAdmin), (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.totalItems = parseInt(action.payload.headers['x-total-count'], 10);
      })
      .addMatcher(isFulfilled(createUser, updateUser), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.user = action.payload.data;
      })
      .addMatcher(isPending(getUsers, getUsersAsAdmin, getUser, userIsARiderOrOwner, getRiderId, getOwnerId, getTruncatedUser), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isPending(createUser, updateUser, deleteUser), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      })
      .addMatcher(
        isRejected(getUsers, getUsersAsAdmin, getUser, getRoles, createUser, updateUser, deleteUser, addOwnerToUser, addRiderToUser),
        (state, action) => {
          state.loading = false;
          state.updating = false;
          state.updateSuccess = false;
          state.errorMessage = action.error.message;
        }
      );
  },
});

export const { reset } = UserManagementSlice.actions;

// Reducer
export default UserManagementSlice.reducer;
