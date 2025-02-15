import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteProject, getProject, handleProjects, projectShowHide } from "../../redux/slices/projectsSlice"
import { useTheme } from "../providers/provider";
import { BsFillXCircleFill, BsPencilSquare } from "react-icons/bs"
import EditorProjectForm from "./editorProjectForm/editorProjectForm";

function EditProject() {
    const { color } = useTheme();
    const style = {
        background: `linear-gradient(45deg, ${color.background1}, ${color.background2})`,
        color: color.color2
    }

    const { projects } = useSelector(state => state.projects)
    const { projectStatus } = useSelector(state => state.projects)
    const [projectID, setProjectID] = useState("")

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(handleProjects())
    }, [dispatch])

    const handleEdit = (id) => {
        dispatch(getProject(id))
        setProjectID(id)
        dispatch(projectShowHide(true))
        if (projectStatus === "rejected") {
            dispatch(getProject(id))
        }
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this project")) {
            dispatch(deleteProject(id))
            dispatch(handleProjects())
        }
    }

    return (
        <div className="w-full flex justify-center relative">
            <div className="w-3/5 mt-2">
                {projects ? projects.map(data =>
                    <div
                        className="p-2 m-1 rounded-md w-full flex items-center justify-between hover:opacity-80 hover:shadow-xl"
                        style={style}
                        key={data.id}
                    >
                        {data.name}
                        <div className="flex gap-3">
                            <button onClick={() => handleEdit(data.id)}><BsPencilSquare className="text-xl" /></button>
                            <button onClick={() => handleDelete(data.id)}><BsFillXCircleFill className="text-xl" /></button>
                        </div>
                    </div>
                ) : ""}
            </div>
            <div className="absolute w-full flex justify-center">
                <EditorProjectForm id={projectID} />
            </div>
        </div >
    )
}

export default EditProject