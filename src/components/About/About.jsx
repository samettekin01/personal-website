import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { handleAbout } from "@/redux/slices/aboutSlice";

function About() {
    const about = useSelector(state => state.about.about)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(handleAbout())
    }, [dispatch])
    return (
        <div className="about-container">
            <span className="mt-20 font-bold text-xl">About me: </span>
            <span className="whitespace-pre-line">{about && about.about}</span>
            <span className="mt-20 font-bold text-xl">What I'm doing now?: </span><span>{about && about.now}</span>
            <span className="mt-20 font-bold text-xl">Hobbies: </span><span>{about && about.hobbies}</span>
        </div>
    )
}

export default About;
