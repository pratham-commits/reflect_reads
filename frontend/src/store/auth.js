import { createSlice } from "@reduxjs/toolkit";
//helps to define the state for login and logout
//reducers are pure functions and help to make changes in following the states
const authSlice = createSlice({
    name: "auth",
    initialState: { isLoggedIn: false, role: "user" },
    reducers: {
        login: (state) => {
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.isLoggedIn = false;
        },
        changeRole: (state, action) => {
            const role = action.payload;
            state.role = role;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
