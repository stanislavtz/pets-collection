import { useAuthContext } from "../../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { user } = useAuthContext();

  return user.email ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
