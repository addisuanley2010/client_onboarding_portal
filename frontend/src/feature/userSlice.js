import {  createSlice } from "@reduxjs/toolkit";

const initialState = {
        user: {
                companyName: "",
                contactPerson: "",
                email: "",
                phone: "+251",
                companySize: "",
                industryType: "",
                projectDescription: "",
                expectedTimeline: "",
                budgetRange: "",
                serviceNeeded: "",
                verified: false,
        },
        loading: false,
        isAuthenticated: false,
        success: false,
        message: '',
        token: '',
};

const userSlice = createSlice({
        name: 'user',
        initialState,
        reducers: {
                loading: (state, action) => {
                        state.loading = action.payload
                        state.isAuthenticated = false
                        state.user = initialState.user
                        state.success = false
                        state.message = ''
                        state.token = ''
                        state.users = []
                        return state
                },

                addUserToStore: (state, action) => {
                        state.user = action.payload.user
                        state.loading = false
                        state.success = action.payload.success
                        state.isAuthenticated = action.payload.isAuthenticated
                        state.message = action.payload.message
                        state.token = action.payload.token
                        return state
                }
              
        }
})
export const { addUserToStore, loading } = userSlice.actions
export default userSlice.reducer;