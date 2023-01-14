import axios from 'axios';
import { createAsyncThunk, isFulfilled, isPending } from '@reduxjs/toolkit';
import { cleanEntity } from 'app/shared/util/entity-utils';
import { IQueryParams, createEntitySlice, EntityState, serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { IHorse, defaultValue } from 'app/shared/model/horse.model';

const initialState: EntityState<IHorse> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
  allHorses: [],
  allHorsesOwnedByOwner: [],
  horse: defaultValue,
};

const apiUrl = 'api/horses';

// Actions

export const getEntities = createAsyncThunk('horse/fetch_entity_list', async ({ page, size, sort }: IQueryParams) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}cacheBuster=${new Date().getTime()}`;
  return axios.get<IHorse[]>(requestUrl);
});

export const getEntity = createAsyncThunk(
  'horse/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return axios.get<IHorse>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const getHorse = createAsyncThunk(
  'horse/fetch_horse',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/horse/${id}`;
    return axios.get<IHorse>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const createHorse = createAsyncThunk(
  'horse/createHorseAndConnectWithOwner',
  async (data: { horse: IHorse; ownerId: string }) => {
    const result = await axios.post(`${apiUrl}/createHorseAndConnectWithOwner`, data);
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const createEntity = createAsyncThunk(
  'horse/create_entity',
  async (entity: IHorse, thunkAPI) => {
    const result = await axios.post<IHorse>(apiUrl, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const updateEntity = createAsyncThunk(
  'horse/update_entity',
  async (entity: IHorse, thunkAPI) => {
    const result = await axios.put<IHorse>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const partialUpdateEntity = createAsyncThunk(
  'horse/partial_update_entity',
  async (entity: IHorse, thunkAPI) => {
    const result = await axios.patch<IHorse>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const getAllHorses = createAsyncThunk('horse/fetch_all_horses', async () => {
  const requestUrl = `api/allhorses`;
  return axios.get<IHorse[]>(requestUrl);
});

export const getHorsesByOwnerId = createAsyncThunk(
  'horse/fetch_HorsesByOwnerId',
  async (ownerId: string | number) => {
    const requestUrl = `api/getHorsesByOwnerId/${ownerId}`;
    return axios.get<IHorse[]>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const deleteEntity = createAsyncThunk(
  'horse/delete_entity',
  async (id: string | number, thunkAPI) => {
    const requestUrl = `${apiUrl}/${id}`;
    const result = await axios.delete<IHorse>(requestUrl);
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const deleteHorse = createAsyncThunk(
  'horse/delete_entity',
  async (id: string | number, thunkAPI) => {
    const requestUrl = `${apiUrl}/deleteHorseWithOwnerId/${id}`;
    const result = await axios.delete<IHorse>(requestUrl);
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

// slice

export const HorseSlice = createEntitySlice({
  name: 'horse',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload.data;
      })
      .addCase(getHorse.fulfilled, (state, action) => {
        state.loading = false;
        state.horse = action.payload.data;
      })
      .addCase(deleteHorse.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
        state.entity = {};
      })
      .addMatcher(isFulfilled(getEntities), (state, action) => {
        const { data, headers } = action.payload;
        return {
          ...state,
          loading: false,
          entities: data,
          totalItems: parseInt(headers['x-total-count'], 10),
        };
      })
      .addMatcher(isFulfilled(getAllHorses), (state, action) => {
        return {
          ...state,
          loading: false,
          allHorses: action.payload.data,
        };
      })
      .addMatcher(isFulfilled(getHorsesByOwnerId), (state, action) => {
        return {
          ...state,
          loading: false,
          allHorsesOwnedByOwner: action.payload.data,
        };
      })
      .addMatcher(isFulfilled(createEntity, updateEntity, partialUpdateEntity, createHorse), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.entity = action.payload.data;
      })
      .addMatcher(isPending(getEntities, getEntity, getAllHorses, getHorse, getHorsesByOwnerId), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isPending(createEntity, updateEntity, partialUpdateEntity, deleteEntity, createHorse, deleteHorse), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      });
  },
});

export const { reset } = HorseSlice.actions;

// Reducer
export default HorseSlice.reducer;
