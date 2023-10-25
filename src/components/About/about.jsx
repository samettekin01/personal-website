import { about } from "../data/about";

function About({ value }) {
    console.log(Object.keys(about.about))
    return (
        <div className={
            `about-container absolute w-full h-full flex flex-col p-6 overflow-auto min-h-min
            ${value ? `opacity-100` : `opacity-0`}`}
            style={value ? { display: "flex" } : { display: "none" }}
        >
            <ul>
                {about.about && Object.keys(about.about).map((data, index) =>
                    <li key={index} className="list-disc mb-2">
                        <span className="font-bold underline">{data.toLocaleUpperCase().replace(/year/i, "")}</span>: {about.about[data]}
                    </li>
                )}
            </ul>
            <span className="mt-10 font-bold underline"> Şuanda ne yapıyorum:</span><span>{about.now}</span>
            <span className="mt-10 font-bold underline">Hobilerim: </span><span>{about.hobbys}</span>
        </div>
    )
}

export default About;