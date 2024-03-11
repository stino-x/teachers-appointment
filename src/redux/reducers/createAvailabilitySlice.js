import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for creating an availability under a teacher
export const createAvailability = createAsyncThunk(
  'availabilities/create',
  async ({ teacherId, availabilityData, userId }) => {
    const response = await fetch(`http://localhost:3000/users/${userId}/teachers/${teacherId}/availabilities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(availabilityData),
    });
    if (!response.ok) {
      throw new Error('Error creating availability');
    }
    const data = await response.json();
    return data;
  },
);

const initialState = {
  status: 'idle',
  loading: false,
  error: null,
};

const AvailabilitySlice = createSlice({
  name: 'availability',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createAvailability.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createAvailability.fulfilled, (state) => {
      state.status = 'succeeded';
    });
    builder.addCase(createAvailability.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default AvailabilitySlice.reducer;