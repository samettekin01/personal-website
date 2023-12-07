import { addDoc, collection } from "firebase/firestore"
import { useFormik } from "formik"
import { db } from "../../firebase/firebase"
import { langsIcons } from "../data/language"

function AboutEditor() {
    const aboutRef = collection(db, "about")
    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            name: "",
            title: "",
            linkedin: "",
            github: "",
            discord: "",
            mail: "",
            now: "",
            hobbies: "",
            lang: [],
            about: ""
        },
        onSubmit: values => {
            const langs = {}
            values.lang.map(data => langs[data] = langsIcons[data])
            addDoc(aboutRef, {
                name: values.name,
                title: values.title,
                linkedin: values.linkedin,
                github: values.github,
                discord: values.discord,
                mail: values.mail,
                about: values.about,
                now: values.now,
                hobbies: values.hobbies,
                lang: langs
            })
        }
    })
    return (
        <div className="w-full flex justify-center">
            <form className="flex flex-col w-3/5 h-5/6 mt-2" onSubmit={handleSubmit}>
                <div className="w-full text-center text-lg">About</div>
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
                <label htmlFor="now" className="input-label">Now:</label>
                <input className="input-blue" onChange={handleChange} value={values.now} type="text" name="now" id="now" />
                <label htmlFor="hobbies" className="input-label">Hobbies</label>
                <input className="input-blue" onChange={handleChange} value={values.hobbies} type="text" name="hobbies" id="hobbies" />
                <span className="input-label">Software Language Skills</span>
                <div className="input-grid">
                    {Object.keys(langsIcons).map((icon, index) => (
                        <label htmlFor={icon} key={index}>
                            <input onChange={handleChange} type="checkbox" name="lang" value={icon} id={icon} />{icon}
                        </label>
                    ))}
                </div>
                <label htmlFor="about" className="input-label">About</label>
                <textarea className="input-blue h-64" onChange={handleChange} value={values.about} name="about" id="about" />
                <input className="btn-blue" type="submit" />
            </form>
        </div>
    )
}

export default AboutEditor