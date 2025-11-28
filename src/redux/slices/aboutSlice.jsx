import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export const handleAbout = createAsyncThunk("about", async () => {
    const querySnapshot = await getDocs(collection(db, "about"))
    const about = querySnapshot.docs.map(doc => doc.data())
    return about
})
export const handleIcons = createAsyncThunk("icons", async () => {
    const querySnapshot = await getDocs(collection(db, "icons"))
    const icons = querySnapshot.docs.map(doc => doc.data())
    return icons
})

const aboutSlice = createSlice({
    name: "about",
    initialState: {
        about: [],
        icons: []
    },
    extraReducers: builder => {
        builder
            .addCase(handleAbout.fulfilled, (state, action) => {
                state.about = action.payload[0]
            })
            .addCase(handleIcons.fulfilled, (state, action) => {
                state.icons = action.payload[0]
            })
    }
})

export default aboutSlice.reducer