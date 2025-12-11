import { useNavigate } from "react-router-dom";
import * as userService from "../../services/users";
import { useAuthContext } from "../../contexts/AuthContext";

function Login() {
  const { userLogin } = useAuthContext();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const { email, password } = Object.fromEntries(formData);

    if (email && password) {
      const data = await userService.login(email, password);

      if (data.message) {
        console.log(data.message);
      } else {
        userLogin(data);
        navigate("/");
      }
    }
  }

  return (
    <section id="login-page" className="login">
      <form id="login-form" action="" method="" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Login Form</legend>
          <p className="field">
            <label htmlFor="email">Email</label>
            <span className="input">
              <input type="text" name="email" id="email" placeholder="Email" />
            </span>
          </p>
          <p className="field">
            <label htmlFor="password">Password</label>
            <span className="input">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </span>
          </p>
          <input className="button submit" type="submit" value="Login" />
        </fieldset>
      </form>
    </section>
  );
}

export default Login;
