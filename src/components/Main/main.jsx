import About from '../About/about';
import Contact from '../Contact/contact';
import Home from '../Home/home';
import Profile from '../Profile/profile';
import Project from '../Project/project';
import { useTheme } from '../Providers/provider';
import { BsEnvelope, BsFileEarmarkCode, BsHouse, BsPerson } from 'react-icons/bs'

import './main.css';
import { useState } from 'react';

function Main() {
    const [page, setPage] = useState("Home");
    const { color } = useTheme();
    const style = {
        background: color.background2,
        color: color.color2
    }
    const pageChange = (e) => {
        setPage(e)
    }
    return (
        <div className="Main">
            <div className='main-container' style={style}>
                <div className='profile'>
                    <Profile />
                    <div className='menu-container absolute flex flex-row justify-around p-4 text-2xl w-11/12'>
                        <button onClick={() => pageChange("Home")}><BsHouse className='menu-icons' /></button>
                        <button onClick={() => pageChange("About")} ><BsPerson className='menu-icons' /></button>
                        <button onClick={() => pageChange("Project")} ><BsFileEarmarkCode className='menu-icons' /></button>
                        <button onClick={() => pageChange("Contact")}><BsEnvelope className='menu-icons' /></button>
                    </div>
                </div>
                <div className='content-container'>
                    {page === "Home" ? <Home value={true} /> : <Home value={false} />}
                    {page === "About" ? <About value={true} /> : <About value={false} />}
                    {page === "Project" ? <Project value={true} /> : <Project value={false} />}
                    {page === "Contact" ? <Contact value={true} /> : <Contact value={false} />}
                </div>
            </div>
        </div>
    );
}

export default Main;
