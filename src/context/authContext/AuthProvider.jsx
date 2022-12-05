import { createContext } from "react";
import useAuthAction from "../../actions/authAction";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const auth = useAuthAction();
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthProvider;