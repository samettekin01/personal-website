import React from 'react'
import { useTheme } from '../Providers/provider'
import { Listbox } from '@headlessui/react'
import { theme } from '../data/theme'
import { about } from '../data/about'
import "./profile.css"

function Profile() {
  const { color, handleTheme } = useTheme();
  const style = {
    background: `linear-gradient(45deg, ${color.background1}, ${color.background2})`,
    color: color.color2
  }
  return (
    <div
      className='profile-container'
      style={style}
    >
      <div className='pr-img-container'>
        <div
          className='pr-img'
          style={{
            backgroundImage: `url(${about.profile})`,
          }}
          alt='Samet Tekin' />
      </div>
      <div className='info-container'>
        <span>{about.name}</span>
        <span>{about.title}</span>
      </div>
      <div className='contact-cont'>
        <a href={about.linkedIn} target="_blank" rel="noreferrer"><img src={about.linkedInIcon} className='w-10 m-2' alt='linkedln' /></a>
        <a href={about.github} target="_blank" rel="noreferrer"><img src={about.githubIcon} className='w-10 m-2' alt='github' /></a>
        <div className='discord-container'>
          <img src={about.discordIcon} className='w-10 m-2' alt='discord' />
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