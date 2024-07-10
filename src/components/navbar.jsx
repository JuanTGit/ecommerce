import { Link } from "react-router-dom";

function Navbar(props) {

    const toCapitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                <Link className="active navbar-brand" aria-current="page" to="/">Home</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            
                            <Link className="nav-link" to="/products">Products</Link>
                            {props.loggedIn ? ( 
                                props.admin ? ( 
                                    <>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {toCapitalize(props.username)}
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <li>
                                                    <Link className="dropdown-item" to="/profile">{toCapitalize(props.username)}</Link>
                                                </li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li>
                                                    <Link className="dropdown-item" to="/profile">Dashboard</Link>
                                                </li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li>
                                                    <Link className="dropdown-item" to="/" onClick={props.logUserOut}>Manage Users</Link>
                                                </li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li>
                                                    <Link className="dropdown-item" to="/" onClick={props.logUserOut}>Manage Products</Link>
                                                </li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li>
                                                    <Link className="dropdown-item" to="/" onClick={props.logUserOut}>Logout</Link>
                                                </li>
                                            </ul>
                                        </li>
                                    
                                    </> 
                                    ) : (
                                    <>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {toCapitalize(props.username)}
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <li>
                                                    <Link className="dropdown-item" to="/profile">{toCapitalize(props.username)}</Link>
                                                </li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li>
                                                    <Link className="dropdown-item" to="/" onClick={props.logUserOut}>Logout</Link>
                                                </li>
                                            </ul>
                                        </li>
                                    </>
                                    )) : (
                                    <>
                                        <Link className="nav-link" to="/register">Register</Link>
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </>
                                )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
