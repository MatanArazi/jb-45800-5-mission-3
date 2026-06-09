import "./Header.css"
import { NavLink } from 'react-router-dom'

export default function Header() {
    return (
        <div className="Header">
            <nav>
                <NavLink to="/" className="navlink">Meetings</NavLink>
                <NavLink to="/home" className="navlink">Home</NavLink>
                <NavLink to="/about" className="navlink">About</NavLink>
            </nav>
        </div>
    )
}