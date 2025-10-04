import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { handleAbout } from "../../redux/slices/aboutSlice";
import { useTheme } from "../Providers/Provider";

function Home() {
    const about = useSelector(state => state.about.about);
    const { color } = useTheme();
    const dispatch = useDispatch();
    const context = ["My Development Toolkit"];
    useEffect(() => {
        dispatch(handleAbout());
    }, [dispatch]);
    return (
        <div className="home-container flex flex-col items-center justify-center absolute w-full h-full">
            <span className={`text-2xl ${color.color1}`}>{context[0]}</span>
            <div className="flex flex-row justify-center mt-4 flex-wrap">

                {about.lang !== undefined ? Object.keys(about.lang).sort().map((data, key) =>
                    <img
                        key={key}
                        className="lang-icon w-11 m-2 hover:scale-150 duration-300"
                        src={about.lang[data]}
                        alt={data}
                    />
                ) : "...Loading"}
            </div>
        </div>
    )
}

export default Home;
