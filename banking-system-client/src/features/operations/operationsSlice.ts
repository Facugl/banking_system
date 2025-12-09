import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createOperation,
  getOperation,
  getOperations,
  updateOperation,
  deleteOperation,
} from './thunks';
import { OperationResponse, OperationsState } from './types';

const initialState: OperationsState = {
  operations: [],
  isLoading: false,
  error: null,
};

const operationsSlice = createSlice({
  name: 'operations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        createOperation.fulfilled,
        (state, action: PayloadAction<OperationResponse>) => {
          state.operations.push(action.payload);
        },
      )
      .addCase(
        getOperation.fulfilled,
        (state, action: PayloadAction<OperationResponse>) => {
          const index = state.operations.findIndex(
            (operatiion) => operatiion.id === action.payload.id,
          );
          if (index >= 0) {
            state.operations[index] = action.payload;
          } else {
            state.operations.push(action.payload);
          }
        },
      )
      .addCase(getOperations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getOperations.fulfilled,
        (state, { payload }: PayloadAction<OperationResponse[]>) => {
          state.isLoading = false;
          state.operations = payload;
        },
      )
      .addCase(getOperations.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as string;
      })
      .addCase(
        updateOperation.fulfilled,
        (state, { payload }: PayloadAction<OperationResponse>) => {
          state.operations = state.operations.map((operation) =>
            operation.id === payload.id ? payload : operation,
          );
        },
      )
      .addCase(
        deleteOperation.fulfilled,
        (state, { payload }: PayloadAction<number>) => {
          state.operations = state.operations.filter(
            (operation) => operation.id !== payload,
          );
        },
      );
  },
});

export default operationsSlice.reducer;
