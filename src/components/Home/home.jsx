import { about } from "../data/about"; 
function Home({ value }) {
        return (
            <div className={
                `home-container flex flex-col items-center justify-center absolute w-full h-full 
            ${value ? `opacity-100` : `opacity-0`}`
            }
                style={value ? { display: "flex" } : { display: "none" }}
            >
                <span className="text-4xl">{about.name}</span>
                <span>{about.title}</span>
                <div className="flex flex-row justify-center mt-4 flex-wrap">
                    {Object.keys(about.lang).map((data,key) => 
                    <img 
                    className="w-11 m-2"
                    key={key}
                    src={about.lang[data]}
                    alt={data}
                      />)}
                </div>
            </div>
        )
    }

export default Home;