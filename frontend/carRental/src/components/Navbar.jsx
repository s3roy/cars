import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/logo/logo.png";
import { useState, useEffect } from "react";

function Navbar() {
  const [nav, setNav] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const openNav = () => {
    setNav(!nav);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    localStorage.removeItem("username"); // Optional: Remove username if stored
    setIsSignedIn(false);
    setUsername("");
    navigate("/signin"); // Redirect to Sign In page
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    console.log("Token:", token);
    console.log("Username:", storedUsername);

    if (token) {
      setIsSignedIn(true);
      setUsername(storedUsername || "User");
    }
  }, []);

  return (
    <>
      <nav>
        {/* Mobile Navbar */}
        <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
          <div onClick={openNav} className="mobile-navbar__close">
            <i className="fa-solid fa-xmark"></i>
          </div>
          <ul className="mobile-navbar__links">
            <li>
              <Link onClick={openNav} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/models">
                Models
              </Link>
            </li>
            {!isSignedIn ? (
              <>
                <li>
                  <Link onClick={openNav} to="/signin">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link onClick={openNav} to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li onClick={handleLogout} style={{ cursor: "pointer" }}>
                Logout
              </li>
            )}
          </ul>
        </div>

        {/* Desktop Navbar */}
        <div className="navbar">
          <div className="navbar__img">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <img src={Logo} alt="logo-img" />
            </Link>
          </div>
          <ul className="navbar__links">
            <li>
              <Link className="home-link" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="models-link" to="/models">
                Vehicle Models
              </Link>
            </li>
            <li>
              <Link className="models-link" to="/compare">
                Vehicle Compare
              </Link>
            </li>
          </ul>
          <div className="navbar__buttons">
            {!isSignedIn ? (
              <>
                <Link className="navbar__buttons__sign-in" to="/signin">
                  Sign In
                </Link>
                <Link className="navbar__buttons__register" to="/register">
                  Register
                </Link>
              </>
            ) : (
              <div className="navbar__user">
                <div
                  className="navbar__user__avatar"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "#007bff",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "20px",
                  }}
                >
                  {username.charAt(0).toUpperCase()}
                </div>

                <button
                  onClick={handleLogout}
                  style={{
                    marginLeft: "1px",
                    marginTop: "5px",
                    padding: "10px 20px",
                    backgroundColor: "#ff4d4f",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="mobile-hamb" onClick={openNav}>
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
