import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

import * as userService from "../../services/users";

function Register() {
  const { userLogin } = useAuthContext();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const { email, password } = Object.fromEntries(formData);
    const rePass = formData.get("confirm-pass");

    if (email && password && rePass) {
      if (password !== rePass) {
        console.log("Password not match!");
      } else {
        const data = await userService.register(email, password);

        if (data.message) {
          console.log(data.message);
        } else {
          userLogin(data);
          navigate("/");
        }
      }
    }
  }

  return (
    <section id="register-page" className="register">
      <form id="register-form" method="POST" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Register Form</legend>
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
          <p className="field">
            <label htmlFor="repeat-pass">Repeat Password</label>
            <span className="input">
              <input
                type="password"
                name="confirm-pass"
                id="repeat-pass"
                placeholder="Repeat Password"
              />
            </span>
          </p>
          <input className="button submit" type="submit" value="Register" />
        </fieldset>
      </form>
    </section>
  );
}

export default Register;
