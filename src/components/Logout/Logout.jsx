import { useNavigate, Link } from "react-router-dom";

import * as userService from "../../services/users";
import { useAuthContext } from "../../contexts/AuthContext";

function Login() {
  const {
    user: { accessToken },
    userLogout,
  } = useAuthContext();

  const navigate = useNavigate();

  function handleLogout() {
    userLogout();
    userService.logout(accessToken);
    navigate("/");
  }

  function handleCancel() {
    navigate(-1);
  }

  return (
    <section id="login-page" className="logout">
      <h1>Are you sure you want to logout ?</h1>
      <button className="button" onClick={handleLogout}>
        Yes
      </button>{" "}
      <button className="button btn-cancel" onClick={handleCancel}>
        Cancel
      </button>
    </section>
  );
}

export default Login;
