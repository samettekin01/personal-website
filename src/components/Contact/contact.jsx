import { about } from "../data/about";

function Contact({ value }) {
  return (
    <div className={
      `about-container absolute w-full h-full flex flex-col justify-center items-center
      ${value ? `opacity-100` : `opacity-0`}`
    }
      style={value ? { display: "flex" } : { display: "none" }}
    >
      <span className="text-3xl">Contact me</span>
      <div className='flex flex-row justify-center relative'>
        <a href={about.linkedIn} target="_blank" rel="noreferrer"><img src={about.linkedInIcon} className='w-10 m-2' alt='linkedln' /></a>
        <a href={about.github} target="_blank" rel="noreferrer"><img src={about.githubIcon} className='w-10 m-2' alt='github' /></a>
        <div className='discord-container'>
          <img src={about.discordIcon} className='w-10 m-2' alt='discord' />
          <div className='adress'><span>{about.discord}</span></div>
        </div>
      </div>
      <a href={`mailto:${about.mail}`}>{about.mail}</a>
    </div>
  )
}

export default Contact;