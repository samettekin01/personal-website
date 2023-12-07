import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { handleAbout } from "../redux/slices/aboutSlice";
import "./home.css"

function Home() {
    const about = useSelector(state => state.about.about)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(handleAbout())
    }, [dispatch])
    return (
        <div className="home-container flex flex-col items-center justify-center absolute w-full h-full">
            <span className="text-4xl">{about.name}</span>
            <span>{about.title}</span>
            <div className="flex flex-row justify-center mt-4 flex-wrap">

                {about.lang !== undefined ? Object.keys(about.lang).map((data, key) =>
                    <img
                        key={key}
                        className="lang-icon"
                        src={about.lang[data]}
                        alt={data}
                    />
                ) : "...Loading"}
            </div>
        </div>
    )
}

export default Home;
