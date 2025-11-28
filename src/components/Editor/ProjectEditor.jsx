import { db } from "../../firebase/firebase"
import { addDoc, collection } from "firebase/firestore"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { handleAbout } from "../../redux/slices/aboutSlice"
import { getLangs } from "../../redux/slices/languagesSlices"

function ProjectEditor() {
    const time = new Date().valueOf()
    const projectRef = collection(db, "projects")
    const isUserSignIn = useSelector(state => state.signin.sign)
    const { about } = useSelector(state => state.about)
    const { langs } = useSelector(state => state.langs)
    const dispatch = useDispatch()
    let initialValues = {
        name: "",
        description: "",
        code: "",
        demo: "",
        img: "",
        lang: {}
    }

    const findLang = (lang) => {
        if (Object.keys(langs).includes(lang)) {
            // Yeni yapıya göre img'yi döndür
            return langs[lang]?.img || ""
        } else {
            return ""
        }
    }

    const { values, handleSubmit, handleChange, resetForm } = useFormik({
        initialValues,
        onSubmit: values => {
            const language = {}
            values.lang.forEach(data => language[data] = findLang(data))
            addDoc(projectRef, {
                name: values.name,
                description: values.description,
                code: values.code,
                demo: values.demo,
                img: values.img,
                lang: language,
                created: time
            })
            resetForm();
        }
    })
    
    useEffect(() => {
        dispatch(handleAbout())
        dispatch(getLangs())
    }, [dispatch])
    
    return (
        <div className="w-full p-6">
            {isUserSignIn ? (
                <div className="w-full max-w-4xl mx-auto">
                    {/* Form Card */}
                    <div className="bg-purple-500/10 backdrop-blur-sm rounded-2xl border border-purple-400/30 overflow-hidden">
                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            {/* Project Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                                    Project Name <span className="text-pink-400">*</span>
                                </label>
                                <input
                                    onChange={handleChange}
                                    value={values.name}
                                    name="name"
                                    id="name"
                                    type="text"
                                    placeholder="Enter project name..."
                                    className="w-full px-4 py-3 bg-white/90 border-2 border-purple-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-white mb-2">
                                    Description <span className="text-pink-400">*</span>
                                </label>
                                <textarea
                                    onChange={handleChange}
                                    value={values.description}
                                    name="description"
                                    id="description"
                                    rows="3"
                                    placeholder="Describe your project..."
                                    className="w-full px-4 py-3 bg-white/90 border-2 border-purple-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all resize-none"
                                    required
                                />
                            </div>

                            {/* Links Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* GitHub Link */}
                                <div>
                                    <label htmlFor="code" className="block text-sm font-medium text-white mb-2">
                                        GitHub Repository <span className="text-pink-400">*</span>
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        value={values.code}
                                        name="code"
                                        id="code"
                                        type="text"
                                        placeholder="https://github.com/..."
                                        className="w-full px-4 py-3 bg-white/90 border-2 border-purple-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                                        required
                                    />
                                </div>

                                {/* Demo Link */}
                                <div>
                                    <label htmlFor="demo" className="block text-sm font-medium text-white mb-2">
                                        Live Demo URL
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        value={values.demo}
                                        name="demo"
                                        id="demo"
                                        type="text"
                                        placeholder="https://demo.example.com"
                                        className="w-full px-4 py-3 bg-white/90 border-2 border-purple-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            {/* Image URL */}
                            <div>
                                <label htmlFor="img" className="block text-sm font-medium text-white mb-2">
                                    Project Image <span className="text-pink-400">*</span>
                                </label>
                                <input
                                    onChange={handleChange}
                                    value={values.img}
                                    name="img"
                                    id="img"
                                    type="text"
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full px-4 py-3 bg-white/90 border-2 border-purple-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                                    required
                                />
                                {values.img && (
                                    <div className="mt-3">
                                        <img
                                            src={values.img}
                                            alt="Preview"
                                            className="w-full h-48 object-cover rounded-xl border-2 border-purple-300"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Technologies */}
                            <div>
                                <label className="block text-sm font-medium text-white mb-3">
                                    Technologies Used
                                </label>
                                <div className="bg-purple-500/20 rounded-xl p-5 border border-purple-400/30">
                                    {langs && langs ? (
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                            {Object.keys(langs).sort().map((data, index) => (
                                                <label
                                                    key={index}
                                                    htmlFor={`tech-${data}`}
                                                    className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all bg-white/80 hover:bg-white text-gray-800 hover:shadow-md"
                                                >
                                                    <input
                                                        id={`tech-${data}`}
                                                        className="w-4 h-4 accent-purple-600 cursor-pointer"
                                                        onChange={handleChange}
                                                        type="checkbox"
                                                        name="lang"
                                                        value={langs[data]?.displayName}
                                                    />
                                                    {/* Yeni yapıya göre img'yi kullan */}
                                                    <img 
                                                        src={langs[data]?.img} 
                                                        alt={data} 
                                                        className="w-6 h-6" 
                                                    />
                                                    <span className="text-sm font-medium truncate">{langs[data]?.displayName}</span>
                                                </label>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center py-6">
                                            <div className="flex items-center gap-3 text-white">
                                                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span>Loading...</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Add Project
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-md mx-auto mt-12">
                    <div className="bg-purple-500/10 backdrop-blur-sm rounded-2xl border border-purple-400/30 p-8 text-center">
                        <svg className="w-16 h-16 mx-auto text-purple-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <h3 className="text-xl font-semibold text-white mb-2">Authentication Required</h3>
                        <p className="text-purple-200">Please sign in to add new projects</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProjectEditor