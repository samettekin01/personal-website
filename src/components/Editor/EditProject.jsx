import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteProject, getProject, handleProjects, projectShowHide } from "../../redux/slices/projectsSlice"
import EditorProjectForm from "./EditorProjectForm/EditorProjectForm"

function EditProject() {
    const { projects } = useSelector(state => state.projects)
    const { projectStatus } = useSelector(state => state.projects)
    const [projectID, setProjectID] = useState("")
    const [searchTerm, setSearchTerm] = useState("")

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
        if (window.confirm("Are you sure you want to delete this project?")) {
            dispatch(deleteProject(id))
            dispatch(handleProjects())
        }
    }

    const filteredProjects = projects?.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="w-full flex justify-center relative p-6">
            <div className="w-full max-w-4xl">
                {/* Header Section */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white mb-4">Edit Projects</h2>

                    {/* Search Bar */}
                    <div className="flex items-center gap-2">
                        <svg
                            className="w-6 h-6 ml-2 text-gray-400 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                </div>

                {/* Projects List */}
                <div className="space-y-3">
                    {filteredProjects && filteredProjects.length > 0 ? (
                        filteredProjects.map(data => (
                            <div
                                className="flex items-center justify-between bg-gray-50/30 rounded-lg p-4 border hover:shadow-md transition-all duration-200 group"
                                key={data.id}
                            >
                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                    {data.img && (
                                        <img
                                            src={data.img}
                                            alt={data.name}
                                            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                                            onError={(e) => e.target.style.display = 'none'}
                                        />
                                    )}
                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-semibold text-white truncate">{data.name}</h3>
                                        {data.description && (
                                            <p className="text-sm text-gray-800 truncate mt-1">{data.description}</p>
                                        )}
                                        {data.lang && Object.keys(data.lang).length > 0 && (
                                            <div className="flex gap-1 mt-2">
                                                {Object.keys(data.lang).slice(0, 5).map((lang, idx) => {
                                                    // data.lang[lang] string mi obje mi kontrol et
                                                    const imgSrc = typeof data.lang[lang] === 'string' 
                                                        ? data.lang[lang] 
                                                        : data.lang[lang]?.img
                                                    
                                                    return (
                                                        <img
                                                            key={idx}
                                                            src={imgSrc}
                                                            alt={lang}
                                                            className="w-5 h-5 object-contain"
                                                            title={lang}
                                                        />
                                                    )
                                                })}
                                                {Object.keys(data.lang).length > 5 && (
                                                    <span className="text-xs text-gray-500 self-center ml-1">
                                                        +{Object.keys(data.lang).length - 5}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-2 flex-shrink-0">
                                    <button
                                        onClick={() => handleEdit(data.id)}
                                        className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(data.id)}
                                        className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed">
                            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p className="text-lg text-gray-600">
                                {searchTerm ? "No projects found" : "No projects yet"}
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                {searchTerm ? "Try a different search term" : "Create your first project in the 'Add Project' tab"}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Edit Modal/Form */}
            <div className="absolute w-full flex justify-center">
                <EditorProjectForm id={projectID} />
            </div>
        </div>
    )
}

export default EditProject