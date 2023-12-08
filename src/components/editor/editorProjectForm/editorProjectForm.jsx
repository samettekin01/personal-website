import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { langsIcons } from "../../data/language"
import { handleProjects, projectShowHide } from "../../redux/slices/projectsSlice"
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { useCallback, useEffect, useState } from "react";

function EditorProjectForm({ id }) {
    const editStatus = useSelector(state => state.projects.editStatus)
    const about = useSelector(state => state.about.about)
    const project = useSelector(state => state.projects.project)
    const [projectLangs, setProjectLangs] = useState(true);
    const [projectData, setProjectData] = useState([]);

    const dispatch = useDispatch();

    let initialValues = {
        name: "",
        description: "",
        code: "",
        demo: "",
        img: "",
        lang: []
    }
    const { values, handleSubmit, handleChange } = useFormik({
        initialValues,
        onSubmit: values => {
            let updateValue = {}
            let langs = {}
            Object.keys(values).forEach(val => {
                if (values[val]) {
                    updateValue[val] = values[val]
                } else {
                    handleClose()
                }
            })
            if (Object.keys(values.lang).length === 0) {
                delete updateValue.lang
            } else {
                updateValue.lang.map(data => langs[data] = langsIcons[data])
                updateValue = {
                    ...updateValue,
                    lang: langs
                }
            }
            updateDoc(doc(db, "projects", id), updateValue)
            dispatch(handleProjects())
        }
    })
    const handleClose = () => {
        dispatch(projectShowHide())
    }
    const handleSetSkill = e => {
        projectStatus()
        if (e.target.checked) {
            values.lang = [...values.lang, e.target.value]
            setProjectData([...values.lang])
        } else {
            const skillFind = values.lang.findIndex(data => data === e.target.value)
            if (skillFind !== -1) {
                values.lang.splice(skillFind, 1)
                setProjectData([...values.lang])
            }
        }
    }

    const projectStatus = useCallback(() => {
        if (projectLangs) {
            project.lang && Object.keys(project.lang).map(data => values.lang.push(data))
            if (Object.keys(values.lang).length > 0) {
                setProjectLangs(false)
            }
        }
    }, [project.lang, values.lang, projectLangs])

    useEffect(() => {
        if (editStatus) {
            if (project.lang) {
                setProjectData([...Object.keys(project.lang)])
            }
        } else {
            values.lang = []
            setProjectLangs(true)
        }
    }, [editStatus, project.lang, values])

    return (
        <form className={`flex flex-col w-3/5 min-w-max p-2 rounded-lg bg-cyan-700 ${editStatus ? "block" : "hidden"}`} onSubmit={handleSubmit}>
            <label htmlFor="name" className="input-label ">Name:</label>
            <input
                onChange={handleChange}
                value={values.name}
                placeholder={project.name}
                name="name"
                id="name"
                type="text"
                className="input-blue mt-2 border-2" />
            <label htmlFor="description" className="input-label ">Description:</label>
            <input
                onChange={handleChange}
                value={values.description}
                placeholder={project.description}
                name="description"
                id="description"
                type="text"
                className="input-blue mt-2" />
            <label htmlFor="code" className="input-label ">Code:</label>
            <input
                onChange={handleChange}
                value={values.code}
                placeholder={project.code}
                name="code"
                id="code"
                type="text"
                className="input-blue mt-2" />
            <label htmlFor="demo" className="input-label ">Demo:</label>
            <input
                onChange={handleChange}
                value={values.demo}
                placeholder={project.demo}
                name="demo"
                id="demo"
                type="text"
                className="input-blue mt-2" />
            <label htmlFor="img" className="input-label ">İmage:</label>
            <input
                onChange={handleChange}
                value={values.img}
                placeholder={project.img}
                name="img"
                id="img"
                type="text"
                className="input-blue mt-2" />
            <div className="grid grid-cols-3" role="group">
                {about ? Object.keys(about.lang).map((data, index) =>
                    <label className="whitespace-nowrap" htmlFor={data} key={index}>
                        <input
                            className="checkbox-style"
                            onChange={handleSetSkill}
                            type="checkbox"
                            name="lang"
                            id={data}
                            value={data}
                            checked={projectData && projectData.includes(data)}
                        />{data}</label>
                ) : "...loading"}
            </div>
            <input className="btn-blue" type="submit" value="Apply" />
            <input className="btn-red" type="button" onClick={handleClose} value="Close" />
        </form>
    )
}

export default EditorProjectForm