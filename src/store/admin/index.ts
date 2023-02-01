import {createAction, createSlice } from "@reduxjs/toolkit";

export const adminLogin = createAction<string>('admin/login')

interface Admin {
    email: string;
    isLogin: boolean;
}

const initialState = {
    email: '',
    isLogin: false
} as Admin;

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminLogin, (state, action) => {
                console.log(action.payload);
                state.isLogin = true;
                state.email = action.payload;
            })
    }
});

export default adminSlice.reducer;
