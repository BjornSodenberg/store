import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";


export const setLastVisible = createAction<string>('history/setLasthVisible');
const initialState = {lastVisibleId: '' };

const historySlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        setLastVisible(state, action: PayloadAction<string>) {
            state.lastVisibleId = action.payload;
        } 
    },
});

export default historySlice.reducer;
