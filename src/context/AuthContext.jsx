import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("studentToken"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      const savedUser = localStorage.getItem("studentUser");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
    setLoading(false);
  }, [token]);

  const login = useCallback((userData, userToken) => {
    localStorage.setItem("studentToken", userToken);
    localStorage.setItem("studentUser", JSON.stringify(userData));
    setToken(userToken);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("studentToken");
    localStorage.removeItem("studentUser");
    setToken(null);
    setUser(null);
  }, []);

  const updateProfile = useCallback((updatedUser) => {
    localStorage.setItem("studentUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, updateProfile, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
