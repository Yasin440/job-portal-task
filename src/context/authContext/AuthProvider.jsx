import { createContext } from "react";
import useAuthAction from "../../actions/authAction";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const AllContext = useAuthAction()
  return (
    <AuthContext.Provider value={AllContext}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthProvider;