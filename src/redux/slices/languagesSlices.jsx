import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export const getLangs = createAsyncThunk("langs", async () => {
    const querySnapshot = await getDocs(collection(db, "langs"))
    const lang = querySnapshot.docs.map(doc => doc.data())
    return lang
})

const langSlice = createSlice({
    name: "lang",
    initialState: {
        langs: []
    },
    extraReducers: builder => {
        builder
            .addCase(getLangs.fulfilled, (state, action) => {
                state.langs = action.payload[0]
            })
    }
})

export default langSlice.reducer