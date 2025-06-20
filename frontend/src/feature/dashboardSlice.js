import {  createSlice } from "@reduxjs/toolkit";

const initialState = {
        
        loading: false,
        isAuthenticated: false,
        success: false,
        message: '',
        token: '',
        totalUsers:0,
        usersByRole:[],
        usersByStatus:[],
        recentUsers:[]       
};

const dashboardSlice = createSlice({
        name: 'dashboardList',
        initialState,
        reducers: {
                loading: (state, action) => {
                        state.loading = action.payload
                        state.isAuthenticated = false
                        state.success = false
                        state.message = ''
                        state.token = ''
                        state.totalUsers = 0
                        state.usersByRole = []
                        state.usersByStatus = []
                        state.recentUsers = []
                        return state
                },

                addDataToStore: (state, action) => {
                        state.totalUsers = action.payload.totalUsers || 0
                        state.usersByRole = action.payload.usersByRole || []
                        state.usersByStatus = action.payload.usersByStatus || []
                        state.recentUsers = action.payload.recentUsers || []
                        state.loading = false
                        state.success = action.payload.success
                        state.isAuthenticated = action.payload.isAuthenticated
                        state.message = action.payload.message
                        state.token = action.payload.token
                        return state
                }
        }
})
export const { addDataToStore, loading } = dashboardSlice.actions
export default dashboardSlice.reducer;