import useAuth from "./customHooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  if (user.email) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location }} />
  }
};

export default PrivateRoute;