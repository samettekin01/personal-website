import { useEffect } from 'react'
import { useTheme } from '../Providers/Provider'
import { Listbox } from '@headlessui/react'
import { theme } from '../../data/theme'
import { useDispatch, useSelector } from 'react-redux'
import { handleAbout, handleIcons } from '../../redux/slices/aboutSlice'
import "./profile.css"

function Profile() {
  const { color, handleTheme } = useTheme();
  const style = {
    background: `linear-gradient(45deg, ${color.background1}, ${color.background2})`,
    color: color.color2
  }
  const { about, icons } = useSelector(state => state.about)
  const dispatch = useDispatch()

  const socials = ["linkedin", "github", "instagram", "discord"]
  useEffect(() => {
    dispatch(handleAbout())
    dispatch(handleIcons())
  }, [dispatch])
  return (
    <div
      className='profile-container'
      style={style}
    >
      <div className='profile-container-mobile'>
        <div className='info-container'>
          <div className='pr-img-container'>
            <div
              className='pr-img'
              style={{
                backgroundImage: `url(${icons.profile})`,
              }}
              alt='Samet Tekin' />
          </div>
          <div className='flex flex-col'>
            <span className='whitespace-nowrap text-2xl'>{about?.name}</span>
            <span>{about?.title}</span>
          </div>
        </div>
        <div className='contact-cont'>
          {socials.map((data, i) =>
            data !== "discord" ?
              <a key={i} href={about[data]} target="_blank" rel="noreferrer">
                <img src={icons[data]} className='w-10' alt={data} />
              </a> :
              <div className='discord-container' key={i}>
                <img src={icons[data]} className='w-10' alt={data} />
                <div className='adress'><span>{about[data]}</span></div>
              </div>
          )}
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
              <Listbox.Option className={`py-0.5 px-2 m-1 rounded-lg hover:bg-white hover:text-black hover:opacity-50 hover:font-bold ${data.name === color.name ? "bg-white text-black opacity-50 font-bold" : ""}`} key={i} onClick={() => handleTheme(i)}>{data.name}</Listbox.Option>
            ) : "Loading...."}
          </Listbox.Options>
        </Listbox>
        <button className='btn-blue absolute bottom-2 right-2'>
          <a href={about?.cv} target='_blank' rel='noreferrer'>Download CV</a>
        </button>
      </div>
    </div>
  )
}

export default Profile;
