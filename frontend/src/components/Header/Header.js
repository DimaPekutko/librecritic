import "./Header.css"

function Header() {
    return (
        <div className="Header">
            <nav className="navbar navbar-expand-lg">
            <a className="navbar-brand" href>Navbar</a>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a className="nav-link" href>Link</a>
                </li>
                </ul>
            </div>
            </nav>
        </div>
    )
}

export default Header