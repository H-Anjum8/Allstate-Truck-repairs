import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  start: null,
  destination: null,
  origin: null,
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
      state.origin = action.payload.origin;
    },
    clearLocations: state => {
      state.start = null;
      state.destination = null;
      state.origin = null; // reset origin too
    },
  },
});

export const { setStart, setDestination, setLocations, clearLocations } =
  locationSlice.actions;
export default locationSlice.reducer;
