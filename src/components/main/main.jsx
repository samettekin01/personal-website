import Profile from '../profile/profile';
import { useTheme } from '../providers/provider';
import { BsEnvelope, BsFileEarmarkCode, BsHouse, BsPerson } from 'react-icons/bs'

import './main.css';
import { NavLink, useLocation, useOutlet } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

function Main() {
    const location = useLocation()
    const currentOutlet = useOutlet()
    const { color } = useTheme();
    const style = {
        background: color.background2,
        color: color.color2
    }
    return (
        <div className="Main">
            <div className='main-container' style={style}>
                <div className='profile'>
                    <Profile />
                    <div className='menu-container absolute flex flex-row justify-around p-4 text-2xl w-11/12'>
                        <NavLink to="/" ><BsHouse className='menu-icons' /></NavLink>
                        <NavLink to="/about"  ><BsPerson className='menu-icons' /></NavLink>
                        <NavLink to="/projects" ><BsFileEarmarkCode className='menu-icons' /></NavLink>
                        <NavLink to="/contact" ><BsEnvelope className='menu-icons' /></NavLink>
                    </div>
                </div>
                <SwitchTransition>
                    <CSSTransition
                        key={location.pathname}
                        timeout={300}
                        classNames="page"
                    >
                        <div className='content-container'>
                            {currentOutlet}
                        </div>
                    </CSSTransition >
                </SwitchTransition>
            </div>
        </div >
    );
}

export default Main;
