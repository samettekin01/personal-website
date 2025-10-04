import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { handleAbout } from "@/redux/slices/aboutSlice";

function About() {
    const about = useSelector(state => state.about.about)
    const dispatch = useDispatch()

    const context = ["about", "now", "hobbies"];

    useEffect(() => {
        dispatch(handleAbout())
    }, [dispatch])

    return (
        <div className="about-container">
            {about && context.map(data => {
                if (about[data]) {
                    return (
                        <div key={data}>
                            <div className="mt-10 font-bold text-xl">{data === "about" ? "About me" : data === "now" ? "What I'm doing now" : "Hobbies"}: </div>
                            <span className="whitespace-pre-line">{about[data]}</span>
                        </div>
                    )
                }
                return null;
            })}
        </div>
    )
}

export default About;
