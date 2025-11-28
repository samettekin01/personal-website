import { useEffect, useState } from "react";
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { handleProjects, projectShowHide } from "../../../redux/slices/projectsSlice"
import { getLangs } from "../../../redux/slices/languagesSlices"

function EditorProjectForm({ id }) {
    const { editStatus, project } = useSelector(state => state.projects)
    const { langs } = useSelector(state => state.langs)
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
    
    const { values, handleSubmit, handleChange, setValues } = useFormik({
        initialValues,
        onSubmit: async (values) => {
            let updateValue = {}
            
            console.log("Submit values:", values)
            
            Object.keys(values).forEach(val => {
                if (val === "lang") {
                    // Lang array'i boş değilse işle
                    if (values.lang && values.lang.length > 0) {
                        let language = {}
                        values.lang.forEach(langName => {
                            // Büyük-küçük harf duyarlı: Firebase'deki ismi aynen kullan
                            language[langName] = langs[langName]?.img || ""
                        });
                        updateValue[val] = language
                    }
                    // Boşsa hiçbir şey ekleme (mevcut değeri koru)
                } else if (values[val] && values[val].trim() !== "") {
                    // Sadece dolu olan değerleri ekle
                    updateValue[val] = values[val]
                }
            })
            
            console.log("Update value:", updateValue)
            
            // Eğer updateValue boş değilse güncelle
            if (Object.keys(updateValue).length > 0) {
                await updateDoc(doc(db, "projects", id), updateValue)
                dispatch(handleProjects())
            }
            
            dispatch(projectShowHide(false))
            resetValue()
        }
    })
    
    const handleClose = () => {
        dispatch(projectShowHide(false))
        resetValue()
    }
    
    const resetValue = () => {
        setValues({
            name: "",
            description: "",
            code: "",
            demo: "",
            img: "",
            lang: []
        })
        setProjectData([])
    }
    
    const handleSetSkill = e => {
        const langKey = e.target.value
        
        if (e.target.checked) {
            if (!values.lang.includes(langKey)) {
                const newLangs = [...values.lang, langKey]
                setValues({ ...values, lang: newLangs })
                setProjectData(newLangs)
            }
        } else {
            const newLangs = values.lang.filter(data => data !== langKey)
            setValues({ ...values, lang: newLangs })
            setProjectData(newLangs)
        }
    }

    useEffect(() => {
        dispatch(getLangs())
    }, [dispatch])

    useEffect(() => {
        if (editStatus && project) {
            const currentLangs = project.lang ? Object.keys(project.lang) : []
            
            setValues({
                name: project.name || "",
                description: project.description || "",
                code: project.code || "",
                demo: project.demo || "",
                img: project.img || "",
                lang: currentLangs,
            })
            setProjectData(currentLangs)
        } else if (!editStatus) {
            resetValue()
        }
    }, [editStatus, project])

    if (!editStatus) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-gray-900 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Edit Project</h2>
                        <p className="text-sm text-gray-400 mt-1">Update project information</p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                        type="button"
                    >
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Project Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                            Project Name
                        </label>
                        <input
                            onChange={handleChange}
                            value={values.name}
                            placeholder={project.name}
                            name="name"
                            id="name"
                            type="text"
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                            Description
                        </label>
                        <textarea
                            onChange={handleChange}
                            value={values.description}
                            placeholder={project.description}
                            name="description"
                            id="description"
                            rows="3"
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                        />
                    </div>

                    {/* Links Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Code Link */}
                        <div>
                            <label htmlFor="code" className="block text-sm font-medium text-gray-300 mb-2">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                    Code Repository
                                </div>
                            </label>
                            <input
                                onChange={handleChange}
                                value={values.code}
                                placeholder={project.code || "GitHub URL"}
                                name="code"
                                id="code"
                                type="text"
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Demo Link */}
                        <div>
                            <label htmlFor="demo" className="block text-sm font-medium text-gray-300 mb-2">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    Live Demo
                                </div>
                            </label>
                            <input
                                onChange={handleChange}
                                value={values.demo}
                                placeholder={project.demo || "Demo URL"}
                                name="demo"
                                id="demo"
                                type="text"
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label htmlFor="img" className="block text-sm font-medium text-gray-300 mb-2">
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Project Image
                            </div>
                        </label>
                        <input
                            onChange={handleChange}
                            value={values.img}
                            placeholder={project.img || "Image URL"}
                            name="img"
                            id="img"
                            type="text"
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                        {values.img && (
                            <div className="mt-3">
                                <img
                                    src={values.img}
                                    alt="Preview"
                                    className="w-full h-40 object-cover rounded-lg"
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                            </div>
                        )}
                    </div>

                    {/* Technologies */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                                Technologies Used
                            </div>
                        </label>
                        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                            {langs ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                    {Object.keys(langs).sort().map((langName, index) => (
                                        <label
                                            key={index}
                                            htmlFor={langName}
                                            className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all ${
                                                projectData && projectData.includes(langName)
                                                    ? 'bg-purple-600 text-white'
                                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                            }`}
                                        >
                                            <input
                                                className="w-4 h-4 accent-purple-500"
                                                onChange={handleSetSkill}
                                                type="checkbox"
                                                name="lang"
                                                id={langName}
                                                value={langName}
                                                checked={projectData && projectData.includes(langName)}
                                            />
                                            <img src={langs[langName].img} alt={langName} className="w-6 h-6" />
                                            <span className="text-sm font-medium truncate">{langs[langName].displayName}</span>
                                        </label>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-4 text-gray-400">Loading technologies...</div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-gray-700">
                        <button
                            type="submit"
                            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditorProjectForm