import { about } from "../data/about";
import "./home.css"
function Home() {
    return (
        <div
            className=
            {`home-container flex flex-col items-center justify-center absolute w-full h-full`}
        >
            <span className="text-4xl">{about.name}</span>
            <span>{about.title}</span>
            <div className="flex flex-row justify-center mt-4 flex-wrap">
                {Object.keys(about.lang).map((data, key) =>
                    <img
                        className="lang-icon"
                        key={key}
                        src={about.lang[data]}
                        alt={data}
                    />)}
            </div>
        </div>
    )
}

export default Home;