import { addDoc, collection, doc, updateDoc } from "firebase/firestore"
import { useFormik } from "formik"
import { db } from "../../firebase/firebase"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { handleAbout } from "../../redux/slices/aboutSlice"
import { getLangs } from "../../redux/slices/languagesSlices"

function AboutEditor() {
    const aboutRef = collection(db, "about")
    const dispatch = useDispatch()
    const { about } = useSelector(state => state.about)
    const { langs } = useSelector(state => state.langs)

    const [aboutLangs, setAboutLangs] = useState(true);
    const [aboutData, setAboutData] = useState([])

    const { values, handleChange, handleSubmit, setValues } = useFormik({
        initialValues: {
            name: "",
            title: "",
            linkedin: "",
            github: "",
            discord: "",
            mail: "",
            cv: "",
            now: "",
            hobbies: "",
            lang: [],
            about: ""
        },
        onSubmit: async (values) => {
            let updateValue = {}
            const selectedLangs = {}

            // Seçili dilleri yeni yapıya göre kaydet
            values.lang.forEach(langKey => {
                if (langs[langKey]) {
                    selectedLangs[langKey] = langs[langKey].img
                }
            })

            Object.keys(values).forEach(val => {
                if (val === "lang") {
                    // lang alanını her zaman güncelle
                    updateValue[val] = selectedLangs
                } else if (values[val]) {
                    updateValue[val] = values[val]
                }
            })

            if (about.docID) {
                await updateDoc(doc(db, "about", about.docID), updateValue)
            } else {
                const docID = await addDoc(aboutRef, updateValue)
                await updateDoc(doc(db, "about", docID.id), { docID: docID.id })
            }
            dispatch(handleAbout())
        }
    })

    const handleSetSkill = e => {
        const langKey = e.target.value

        if (e.target.checked) {
            // Dil ekle
            if (!values.lang.includes(langKey)) {
                values.lang = [...values.lang, langKey]
                setAboutData([...values.lang])
            }
        } else {
            // Dil çıkar
            values.lang = values.lang.filter(data => data !== langKey)
            setAboutData([...values.lang])
        }
    }

    useEffect(() => {
        dispatch(handleAbout())
        dispatch(getLangs())
    }, [dispatch])

    useEffect(() => {
        if (about && about.lang) {
            // Mevcut dilleri array olarak al
            const currentLangs = Object.keys(about.lang)
            setAboutData(currentLangs)
            setValues({
                name: about.name || "",
                title: about.title || "",
                linkedin: about.linkedin || "",
                github: about.github || "",
                discord: about.discord || "",
                mail: about.mail || "",
                cv: about.cv || "",
                now: about.now || "",
                hobbies: about.hobbies || "",
                lang: currentLangs,
                about: about.about || ""
            })
        }
    }, [about, setValues])

    return (
        <div className="w-full flex justify-center p-6">
            <div className="flex flex-col w-full max-w-4xl gap-4">
                {/* Personal Information Section */}
                <div className="rounded-lg shadow-sm border p-6">
                    <h3 className="text-xl font-semibold mb-4 text-white">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-white mb-1">Name</label>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                onChange={handleChange}
                                value={values.name}
                                type="text"
                                name="name"
                                id="name"
                            />
                        </div>
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-white mb-1">Title</label>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                onChange={handleChange}
                                value={values.title}
                                type="text"
                                name="title"
                                id="title"
                            />
                        </div>
                    </div>
                </div>

                {/* Contact & Social Section */}
                <div className="rounded-lg shadow-sm border p-6">
                    <h3 className="text-xl font-semibold mb-4 text-white">Contact & Social Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="linkedin" className="block text-sm font-medium text-white mb-1">LinkedIn</label>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                onChange={handleChange}
                                value={values.linkedin}
                                type="text"
                                name="linkedin"
                                id="linkedin"
                            />
                        </div>
                        <div>
                            <label htmlFor="github" className="block text-sm font-medium text-white mb-1">GitHub</label>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                onChange={handleChange}
                                value={values.github}
                                type="text"
                                name="github"
                                id="github"
                            />
                        </div>
                        <div>
                            <label htmlFor="discord" className="block text-sm font-medium text-white mb-1">Discord ID</label>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                onChange={handleChange}
                                value={values.discord}
                                type="text"
                                name="discord"
                                id="discord"
                            />
                        </div>
                        <div>
                            <label htmlFor="mail" className="block text-sm font-medium text-white mb-1">Email</label>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                onChange={handleChange}
                                value={values.mail}
                                type="email"
                                name="mail"
                                id="mail"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="cv" className="block text-sm font-medium text-white mb-1">CV Link</label>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                onChange={handleChange}
                                value={values.cv}
                                type="text"
                                name="cv"
                                id="cv"
                            />
                        </div>
                    </div>
                </div>

                {/* Additional Info Section */}
                <div className="rounded-lg shadow-sm border p-6">
                    <h3 className="text-xl font-semibold mb-4 text-white">Additional Information</h3>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="now" className="block text-sm font-medium text-white mb-1">Current Activity</label>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                onChange={handleChange}
                                value={values.now}
                                type="text"
                                name="now"
                                id="now"
                                placeholder="What are you working on now?"
                            />
                        </div>
                        <div>
                            <label htmlFor="hobbies" className="block text-sm font-medium text-white mb-1">Hobbies</label>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                onChange={handleChange}
                                value={values.hobbies}
                                type="text"
                                name="hobbies"
                                id="hobbies"
                            />
                        </div>
                    </div>
                </div>

                {/* Skills Section */}
                <div className="rounded-lg shadow-sm border p-6">
                    <h3 className="text-xl font-semibold mb-4 text-white">Software Language Skills</h3>
                    {Object.keys(langs).length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {Object.keys(langs).map((icon, index) => (
                                <label
                                    htmlFor={icon}
                                    key={index}
                                    className="
                                    flex items-center gap-2 p-2 rounded-lg hover:bg-opacity-50 
                                    transition-colors cursor-pointer border border-transparent 
                                    hover:border-purple-200 transition-colors
                                    "
                                >
                                    <input
                                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                        onChange={handleSetSkill}
                                        type="checkbox"
                                        name="lang"
                                        value={icon}
                                        id={icon}
                                        checked={aboutData && aboutData.includes(icon)}
                                    />
                                    <img
                                        src={langs[icon].img}
                                        alt={icon}
                                        className="w-6 h-6 object-contain"
                                    />
                                    <span className="text-sm font-medium">{langs[icon]?.displayName}</span>
                                </label>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm">No languages available. Please add languages first in the Languages tab.</p>
                    )}
                </div>

                {/* About Section */}
                <div className="rounded-lg shadow-sm border p-6">
                    <h3 className="text-xl font-semibold mb-4 text-white">About</h3>
                    <label htmlFor="about" className="block text-sm font-medium text-white mb-1">About Me</label>
                    <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[200px] whitespace-pre-line"
                        onChange={handleChange}
                        value={values.about}
                        name="about"
                        id="about"
                        placeholder="Tell us about yourself..."
                    />
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition-colors shadow-sm"
                >
                    Save Changes
                </button>
            </div>
        </div>
    )
}

export default AboutEditor