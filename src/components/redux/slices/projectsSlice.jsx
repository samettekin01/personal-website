import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

const projectsRef = query(collection(db, "projects"), orderBy("created", "desc"))
export const handleProjects = createAsyncThunk("projects", async () => {
    let projects = [];
    projects = (await getDocs(projectsRef)).docs.map(doc => ({ id: doc.id, ...doc.data() }))
    return projects
})

export const deleteProject = createAsyncThunk("deleteProject", async (id) => {
    deleteDoc(doc(db, "projects", id))
})

export const getProject = createAsyncThunk("getProject", async (id) => {
    let project = [];
    project = await getDoc(doc(db, "projects", id))
    return project.data();
})

const projectsSlice = createSlice({
    name: "projects",
    initialState: {
        projects: [],
        project: [],
        projectStatus: "",
        editStatus: false
    },
    reducers: {
        projectShowHide: (state, action) => {
            state.editStatus = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(handleProjects.fulfilled, (state, action) => {
                state.projects = action.payload
            })
            .addCase(getProject.fulfilled, (state, action) => {
                state.project = action.payload
                state.projectStatus = "fulfilled"
            })
            .addCase(getProject.rejected, (state) => {
                state.projectStatus = "rejected"
            })
            .addCase(getProject.pending, (state) => {
                state.projectStatus = "pending"
            })
    }
})

export default projectsSlice.reducer
export const { projectShowHide } = projectsSlice.actions