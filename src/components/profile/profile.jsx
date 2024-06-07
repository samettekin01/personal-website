import React, { useEffect } from 'react'
import { useTheme } from '../providers/provider'
import { Listbox } from '@headlessui/react'
import { theme } from '../data/theme'
import { useDispatch, useSelector } from 'react-redux'
import { handleAbout, handleIcons } from '../redux/slices/aboutSlice'
import "./profile.css"

function Profile() {
  const { color, handleTheme } = useTheme();
  const style = {
    background: `linear-gradient(45deg, ${color.background1}, ${color.background2})`,
    color: color.color2
  }
  const about = useSelector(state => state.about.about)
  const icons = useSelector(state => state.about.icons)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(handleAbout())
    dispatch(handleIcons())
  }, [dispatch])
  return (
    <div
      className='profile-container'
      style={style}
    >
      <div className='pr-img-container'>
        <div
          className='pr-img'
          style={{
            backgroundImage: `url(${icons.profile})`,
          }}
          alt='Samet Tekin' />
      </div>
      <div className='info-container'>
        <span>{about.name}</span>
        <span>{about.title}</span>
        <button className='btn-blue'>
          <a href={about.cv} target='_blank' rel='noreferrer'>CV indir</a>
        </button>
      </div>
      <div className='contact-cont'>
        <a href={about.linkedin} target="_blank" rel="noreferrer"><img src={icons.linkedin} className='w-10 m-2' alt='linkedln' /></a>
        <a href={about.github} target="_blank" rel="noreferrer"><img src={icons.github} className='w-10 m-2' alt='github' /></a>
        <div className='discord-container'>
          <img src={icons.discord} className='w-10 m-2' alt='discord' />
          <div className='adress'><span>{about.discord}</span></div>
        </div>
      </div>
      <Listbox >
        <Listbox.Button
          className="list-button"
          style={{ backgroundColor: color.background2 }}
        >Themes</Listbox.Button>
        <Listbox.Options
          className="list-options"
          style={style}
        >
          {theme ? theme.map((data, i) =>
            <Listbox.Option className="p-3 rounded-lg hover:bg-white hover:text-black hover:opacity-50 hover:font-bold" key={i} onClick={() => handleTheme(i)}>{data.name}</Listbox.Option>
          ) : "Loading...."}
        </Listbox.Options>
      </Listbox>
    </div>
  )
}

export default Profile;
