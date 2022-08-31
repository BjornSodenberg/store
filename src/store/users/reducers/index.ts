import { createAction, createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { database } from 'utils/firebase';
import { get, ref, update } from "@firebase/database";

import { User } from "components/update-user/types";

const employeesAdapter = createEntityAdapter<User>()

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

export const calculateTotal = createAction("employees/calculateTotal");

export const updateEmployer = createAction<User>('employees/updateEmployer');

const employeesSlice = createSlice({
    name: 'employees',
    initialState: employeesAdapter.getInitialState(
        {
            totalEmployees: 0,
            totalLemons: 0,
            totalDiamonds: 0
        }
    ),
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployess.fulfilled, (state, action:PayloadAction<User[]>) => {
                employeesAdapter.setAll(state, action.payload);

                state.totalDiamonds = 0;
                state.totalEmployees = 0;
                state.totalLemons = 0;

                action.payload.forEach(item => {
                    state.totalLemons += item.lemons;
                    state.totalDiamonds += item.diamonds;
                    state.totalEmployees += 1;
                })
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
                    });
                }
            })
    }
});

export default employeesSlice.reducer;
