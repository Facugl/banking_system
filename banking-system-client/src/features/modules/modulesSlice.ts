import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createModule,
  getModules,
  getModule,
  updateModule,
  deleteModule,
} from './thunks';
import { ModuleState, ModuleResponse } from './types';

const initialState: ModuleState = {
  modules: [],
  loading: false,
  error: null,
};

const modulesSlice = createSlice({
  name: 'modules',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getModules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getModules.fulfilled,
        (state, action: PayloadAction<ModuleResponse[]>) => {
          state.loading = false;
          state.modules = action.payload;
        },
      )
      .addCase(getModules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(
        getModule.fulfilled,
        (state, action: PayloadAction<ModuleResponse>) => {
          const existingModule = state.modules.find(
            (module) => module.id === action.payload.id,
          );
          if (existingModule) {
            Object.assign(existingModule, action.payload);
          } else {
            state.modules.push(action.payload);
          }
        },
      )
      .addCase(
        createModule.fulfilled,
        (state, action: PayloadAction<ModuleResponse>) => {
          state.modules.push(action.payload);
        },
      )
      .addCase(
        updateModule.fulfilled,
        (state, action: PayloadAction<ModuleResponse>) => {
          const index = state.modules.findIndex(
            (module) => module.id === action.payload.id,
          );
          if (index >= 0) {
            state.modules[index] = action.payload;
          }
        },
      )
      .addCase(
        deleteModule.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.modules = state.modules.filter(
            (module) => module.id !== action.payload,
          );
        },
      );
  },
});

export default modulesSlice.reducer;
