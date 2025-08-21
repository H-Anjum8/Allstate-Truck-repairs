import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  start: null,
  destination: null,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setStart: (state, action) => {
      state.start = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setLocations: (state, action) => {
      state.start = action.payload.start;
      state.destination = action.payload.destination;
    },
    clearLocations: state => {
      state.start = null;
      state.destination = null;
    },
  },
});

export const { setStart, setDestination, setLocations, clearLocations } =
  locationSlice.actions;
export default locationSlice.reducer;
