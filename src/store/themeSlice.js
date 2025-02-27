import {createSlice} from '@reduxjs/toolkit';
import {theme} from '../styles/theme';

const initialState = {
  theme: theme.light,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = theme[action.payload];
    },
  },
});

export {themeSlice};
export const {setTheme} = themeSlice.actions;
