import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { handleAbout } from "../../redux/slices/aboutSlice";

function About() {
    const about = useSelector(state => state.about.about)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(handleAbout())
    }, [dispatch])
    return (
        <div className="about-container absolute w-full h-full flex flex-col p-6 overflow-auto min-h-min">
            <span className="whitespace-pre-line">{about && about.about}</span>
            <span className="mt-10 font-bold underline">Şuanda ne yapıyorum:</span><span>{about && about.now}</span>
            <span className="mt-10 font-bold underline">Hobilerim: </span><span>{about && about.hobbies}</span>
        </div>
    )
}

export default About;
