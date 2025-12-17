import { useAuthContext } from "../../../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
