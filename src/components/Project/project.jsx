import { useTheme } from "../Providers/provider";
import { projects } from "../data/projects";
import "./project.css"

function Project({ value }) {
  const { color } = useTheme();
  const style = {
    background: `linear-gradient(45deg, ${color.background1}, ${color.background2})`,
    color: color.color2
  }
  return (
    <div className={
      `about-container absolute w-full h-full flex flex-row flex-wrap justify-around items-center overflow-auto p-2
      ${value ? `opacity-100` : `opacity-0`}`}
      style={value ? { display: "flex" } : { display: "none" }}
    >

      {
        projects && projects.map((data, index) =>
          <div key={index} className="project-card flex flex-col items-center m-4 p-2 rounded-xl shadow-xl" style={style}>
            <span>{data.name}</span>
            <div className="project-image" style={{
              backgroundImage: `url(${data.img})`,
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: "240px",
              height: "160px",
              zIndex: "1",
            }} >
              <div className="project-descript">
                {data.descript}
              </div>
            </div>
            <div className="flex flex-row justify-around w-full">
              <a
                onMouseOver={e => e.target.style.color = color.color1}
                onMouseOut={e => e.target.style.color = ""}
                href={data.demo}
                target="_blank"
                rel="noreferrer"
              ><span>Demo</span></a>
              <a
                onMouseOver={e => e.target.style.color = color.color1}
                onMouseOut={e => e.target.style.color = ""}
                className="hover:text-red-700"
                href={data.code}
                target="_blank"
                rel="noreferrer"
              ><span>Code</span></a>
            </div>
            <div className="flex flex-row w-full justify-center mt-2">
            {
            Object.keys(data.lang).map((d,i) => data.lang[d] && <img key={i} width="30px" height="30px" className="m-1" src={data.lang[d]} alt={d}/>)
            }
            </div>
          </div>
        )}
       
    </div>
  )
}

export default Project;