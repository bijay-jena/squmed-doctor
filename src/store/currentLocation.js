import {createSlice} from '@reduxjs/toolkit';

const currentLocationSlice = createSlice({
  name: 'currentLocation',
  initialState: {
    displayText: 'Sector 1, Gurugram',
    addressType: '',
    buildingName: '',
    locality: [
      'Sector 1',
      'Sector 2',
      'Sector 3',
      'Sector 4',
      'Sector 5',
      'Sector 6',
      'Sector 7',
      'Sector 8',
      'Sector 9',
      'Sector 10',
    ],
    streetName: '',
    city: 'Gurugram',
  },
  reducers: {
    setDisplayText(state, action) {
      state.displayText = action.payload.displayText;
    },
  },
});

export {currentLocationSlice};
export const {setDisplayText} = currentLocationSlice.actions;
