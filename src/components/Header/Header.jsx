import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

function Header() {
  const {
    user: { email },
  } = useAuthContext();

  return (
    <header id="site-header">
      <nav className="navbar">
        <section className="navbar-dashboard">
          <NavLink to="/">Dashboard</NavLink>

          {!email && (
            <div id="guest">
              <NavLink className="button" to="/login">
                Login
              </NavLink>
              <NavLink className="button" to="/register">
                Register
              </NavLink>
            </div>
          )}

          {email && (
            <div id="user">
              <span>Welcome, {email}</span>
              <NavLink className="button" to="/my-pets">
                My Pets
              </NavLink>
              <NavLink className="button" to="/create">
                Add Pet
              </NavLink>
              <NavLink className="button" to="/logout">
                Logout
              </NavLink>
            </div>
          )}
        </section>
      </nav>
    </header>
  );
}

export default Header;
