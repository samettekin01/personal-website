import { addDoc, collection, doc, updateDoc } from "firebase/firestore"
import { useFormik } from "formik"
import { db } from "../../firebase/firebase"
import { langsIcons } from "../../data/language"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { handleAbout } from "../../redux/slices/aboutSlice"

function AboutEditor() {
    const aboutRef = collection(db, "about")
    const dispatch = useDispatch()
    const { about } = useSelector(state => state.about)

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
            const langs = {}
            values.lang.map(data => langs[data] = langsIcons[data])
            Object.keys(values).forEach(val => {
                if (values[val]) {
                    updateValue[val] = values[val]
                }
            })
            if (about.docID) {
                await updateDoc(doc(db, "about", about.docID), { ...updateValue, lang: langs })
            } else {
                const docID = await addDoc(aboutRef, { updateValue, lang: langs })
                await updateDoc(doc(db, "about", docID.id), { docID: docID.id })
            }
            dispatch(handleAbout())
        }
    })

    const handleSetSkill = e => {
        aboutLang()
        if (e.target.checked) {
            values.lang = [...values.lang, e.target.value]
            setAboutData([...values.lang])
        } else {
            const skillFind = values.lang.findIndex(data => data === e.target.value)
            if (skillFind !== -1) {
                values.lang.splice(skillFind, 1)
                setAboutData([...values.lang])
            }
        }
    }

    const aboutLang = () => {
        if (aboutLangs) {
            about.lang && Object.keys(about.lang).map(data => values.lang.push(data))
            if (Object.keys(values.lang).length > 0) {
                setAboutLangs(false)
            }
        }
    }

    useEffect(() => {
        dispatch(handleAbout())
    }, [dispatch])

    useEffect(() => {
        if (about && about.lang) {
            setAboutData([...Object.keys(about.lang)])
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
                lang: about.lang ? Object.keys(about.lang) : [],
                about: about.about || ""
            })
        }
    }, [about, setValues])

    return (
        <div className="w-full flex justify-center">
            <form className="flex flex-col w-3/5 h-5/6 mt-2" onSubmit={handleSubmit}>
                <label htmlFor="name" className="input-label">Name</label>
                <input className="input-blue" onChange={handleChange} value={values.name} type="text" name="name" id="name" />
                <label htmlFor="title" className="input-label">Title</label>
                <input className="input-blue" onChange={handleChange} value={values.title} type="text" name="title" id="title" />
                <label htmlFor="linkedin" className="input-label">Linkedin</label>
                <input className="input-blue" onChange={handleChange} value={values.linkedin} type="text" name="linkedin" id="linkedin" />
                <label htmlFor="github" className="input-label">GitHub</label>
                <input className="input-blue" onChange={handleChange} value={values.github} type="text" name="github" id="github" />
                <label htmlFor="discord" className="input-label">Discord ID:</label>
                <input className="input-blue" onChange={handleChange} value={values.discord} type="text" name="discord" id="discord" />
                <label htmlFor="mail" className="input-label">Mail:</label>
                <input className="input-blue" onChange={handleChange} value={values.mail} type="text" name="mail" id="mail" />
                <label htmlFor="cv" className="input-label">CV:</label>
                <input className="input-blue" onChange={handleChange} value={values.cv} type="text" name="cv" id="cv" />
                <label htmlFor="now" className="input-label">Now:</label>
                <input className="input-blue" onChange={handleChange} value={values.now} type="text" name="now" id="now" />
                <label htmlFor="hobbies" className="input-label">Hobbies</label>
                <input className="input-blue" onChange={handleChange} value={values.hobbies} type="text" name="hobbies" id="hobbies" />
                <span className="input-label">Software Language Skills</span>
                <div className="input-grid">
                    {Object.keys(langsIcons).map((icon, index) => (
                        <label htmlFor={icon} key={index}>
                            <input
                                className="checkbox-style"
                                onChange={handleSetSkill}
                                type="checkbox"
                                name="lang"
                                value={icon}
                                id={icon}
                                checked={aboutData && aboutData.includes(icon)}
                            />{icon}
                        </label>
                    ))}
                </div>
                <label htmlFor="about" className="input-label">About</label>
                <textarea className="input-blue h-64 whitespace-pre-line" onChange={handleChange} value={values.about} name="about" id="about" />
                <input className="btn-blue" type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default AboutEditor