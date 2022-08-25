import { createAction, createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { database } from 'utils/firebase';
import { get, ref, update } from "@firebase/database";

import { User } from "components/update-user/types";

const employeesAdapter = createEntityAdapter<User>({
    // Assume IDs are stored in a field other than `book.id`
    selectId: (employer) => employer.id,
})

export const fetchEmployess = createAsyncThunk(
    'employees/fetchEmployees',
    async function () {
        const usersRef = ref(database, '/users');
        try {
            const snapshot = await get(usersRef);
            if (snapshot.exists()) {
                return snapshot.val();
            }
        } catch (e) {
            return e;
        }
    }
);

export const updateEmployer = createAction<User>('employees/updateEmployer');

const employeesSlice = createSlice({
    name: 'employees',
    initialState: employeesAdapter.getInitialState(),
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployess.fulfilled, (state, action) => {
                employeesAdapter.setAll(state, action.payload);
            })
            .addCase(updateEmployer, (state, action: PayloadAction<User>) => {
                const user = action.payload;
                if (user) {
                    const updates: any = {};
                    const idx = user.id % 1000;

                    updates[`/users/${idx}`] = user;
                    update(ref(database), updates);
                    employeesAdapter.updateOne(state, {
                        id: user.id,
                        changes: user
                    })
                }
            })

    }
});

export default employeesSlice.reducer;
