import { useTheme } from "../providers/provider";
import "./project.css"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { handleProjects } from "../redux/slices/projectsSlice";

function Project() {
  const { color } = useTheme();
  const style = {
    background: `linear-gradient(45deg, ${color.background1}, ${color.background2})`,
    color: color.color2
  }
  const projects = useSelector(state => state.projects.projects)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(handleProjects())
  }, [dispatch])
  return (
    <div className={
      `about-container absolute w-full h-full flex flex-row flex-wrap justify-around items-center overflow-auto p-2`}
    >
      {
        projects ? projects.map((data, index) =>
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
                {data.description}
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
                Object.keys(data.lang).sort().map((d, i) => data.lang[d] && <img key={i} width="30px" height="30px" className="m-1" src={data.lang[d]} alt={d} />)
              }
            </div>
          </div>
        ): "...loading"}

    </div>
  )
}

export default Project;
