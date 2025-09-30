import { db } from "../../firebase/firebase"
import { addDoc, collection } from "firebase/firestore"
import { useFormik } from "formik"
import { langsIcons } from "../../data/language"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { handleAbout } from "../../redux/slices/aboutSlice"

function ProjectEditor() {
    const projectRef = collection(db, "projects")
    const isUserSignIn = useSelector(state => state.signin.sign)
    const about = useSelector(state => state.about.about)
    const dispatch = useDispatch()
    let initialValues = {
        name: "",
        description: "",
        code: "",
        demo: "",
        img: "",
        lang: {}
    }
    
    const time = new Date().valueOf()

    const { values, handleSubmit, handleChange, resetForm } = useFormik({
        initialValues,
        onSubmit: values => {
            const langs = {}
            values.lang.map(data => langs[data] = langsIcons[data])
            addDoc(projectRef, {
                name: values.name,
                description: values.description,
                code: values.code,
                demo: values.demo,
                img: values.img,
                lang: langs,
                created: time
            })
            resetForm();
        }
    })
    useEffect(() => {
        dispatch(handleAbout())
    }, [dispatch])
    return (
        <div className="flex w-full h-full">
            {isUserSignIn &&
                <div className="flex flex-col w-full h-full items-center">
                    <div className="flex flex-col w-3/5 mt-2">
                        <form className="flex flex-col" onSubmit={handleSubmit}>
                            <label className="input-label">Name</label>
                            <input
                                onChange={handleChange}
                                value={values.name}
                                name="name"
                                type="text"
                                className="input-blue"
                                required
                            />
                            <label className="input-label">Description</label>
                            <input
                                onChange={handleChange}
                                value={values.description}
                                name="description"
                                type="text"
                                className="input-blue"
                                required
                            />
                            <label className="input-label">Demo Link</label>
                            <input
                                onChange={handleChange}
                                value={values.demo}
                                name="demo"
                                type="text"
                                className="input-blue"
                            />
                            <label className="input-label">GitHub Link</label>
                            <input
                                onChange={handleChange}
                                value={values.code}
                                name="code"
                                type="text"
                                className="input-blue"
                                required
                            />
                            <label className="input-label">Image Link</label>
                            <input
                                onChange={handleChange}
                                value={values.img}
                                name="img"
                                type="text"
                                className="input-blue"
                                required
                            />
                            <label className="input-label">Technologies Used</label>
                            <div className="input-grid">
                                {
                                    about ? Object.keys(about.lang).map((data, index) =>
                                        <label key={index}>
                                            <input
                                                className="checkbox-style"
                                                onChange={handleChange}
                                                type="checkbox"
                                                name="lang"
                                                value={data}
                                            />{data}</label>
                                    ) : "...loading"
                                }
                            </div>
                            <input className="p-2 rounded-full btn-blue" type="submit" value="Apply" />
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}

export default ProjectEditor