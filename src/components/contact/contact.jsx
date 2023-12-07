import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleAbout, handleIcons } from "../redux/slices/aboutSlice";

function Contact() {
  const icons = useSelector(state => state.about.icons)
  const about = useSelector(state => state.about.about)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(handleIcons())
    dispatch(handleAbout())
  }, [dispatch])
  return (
    <div className={
      `about-container absolute w-full h-full flex flex-col justify-center items-center`}
    >
      <span className="text-3xl">Contact me</span>
      {about &&
        <div className='flex flex-row justify-center relative'>
          <a href={about.linkedin} target="_blank" rel="noreferrer"><img src={icons.linkedin} className='w-10 m-2' alt='linkedln' /></a>
          <a href={about.github} target="_blank" rel="noreferrer"><img src={icons.github} className='w-10 m-2' alt='github' /></a>
          <div className='discord-container'>
            <img src={icons.discord} className='w-10 m-2' alt='discord' />
            <div className='adress'><span>{about.discord}</span></div>
          </div>
        </div>
      }
      <a href={`mailto:${about.mail}`}>{about.mail}</a>
    </div>
  )
}

export default Contact;
