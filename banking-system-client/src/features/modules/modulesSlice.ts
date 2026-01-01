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
      .addCase(
        createModule.fulfilled,
        (state, action: PayloadAction<ModuleResponse>) => {
          state.modules.push(action.payload);
        },
      )
      .addCase(
        getModule.fulfilled,
        (state, action: PayloadAction<ModuleResponse>) => {
          const index = state.modules.findIndex(
            (module) => module.id === action.payload.id,
          );

          if (index !== -1) {
            state.modules[index] = action.payload;
          } else {
            state.modules.push(action.payload);
          }
        },
      )
      .addCase(getModules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getModules.fulfilled,
        (state, { payload }: PayloadAction<ModuleResponse[]>) => {
          state.loading = false;
          state.modules = payload;
        },
      )
      .addCase(getModules.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      .addCase(
        updateModule.fulfilled,
        (state, { payload }: PayloadAction<ModuleResponse>) => {
          state.modules = state.modules.map((module) =>
            module.id === payload.id ? payload : module,
          );
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
