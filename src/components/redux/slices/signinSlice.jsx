import { createSlice } from "@reduxjs/toolkit";

const signinSlice = createSlice({
    name: "sign",
    initialState: {
        sign: false
    },
    reducers: {
        signStatus: (state, action) => {
            state.sign = action.payload
        }
    }
})

export default signinSlice.reducer
export const { signStatus } = signinSlice.actions