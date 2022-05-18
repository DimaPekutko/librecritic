import { useContext } from "react"
import { Link } from "react-router-dom"
import AuthContext from "../../context/AuthContext"
import "./Header.css"

function Header() {

    let {user, logout} = useContext(AuthContext)
    
    return (
        <div className="Header container-fluid">
            <Link className="navbar-brand" to="/">LibreCritic</Link>
            {user && <Link to="/me">@{user.username}</Link>}
            {user && <a onClick={logout}>exit</a>}
            {!user && <Link to="/login">Login</Link>}
            {!user && <Link to="/register">Register</Link>}
        </div>
    )
}

export default Header