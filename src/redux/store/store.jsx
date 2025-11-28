import { configureStore } from "@reduxjs/toolkit";
import signinReducer from "../slices/signinSlice";
import aboutReducer from "../slices/aboutSlice";
import projectsReducer from "../slices/projectsSlice";
import langsReducer from "../slices/languagesSlices";

export const store = configureStore({
    reducer: {
        signin: signinReducer,
        about: aboutReducer,
        projects: projectsReducer,
        langs: langsReducer
    }
})