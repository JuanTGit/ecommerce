import { Link } from "react-router-dom";

function Navbar(props) {
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
                                <>
                                    <Link className="nav-link" to="/" onClick={props.logUserOut}>Logout</Link>
                                    <Link className="nav-link" to="/profile">Profile</Link>
                                </>
                                ) : (
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
