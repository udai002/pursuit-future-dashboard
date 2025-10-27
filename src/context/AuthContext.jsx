import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const AuthContext = createContext({
  userDetails: null,
  loading: false,
  isLoggedIn: false,
  loginUser: () => {},
  sessionError: false,
  loadingAuth: false,
  logout: () => {}
});

function AuthProvider({ children }) {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionError, setSessionError] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const navigate = useNavigate();

  // ✅ verify token on mount
  useEffect(() => {
    async function verifySession() {
      try {
        const tokenString = localStorage.getItem("session_token");
        if (!tokenString) {
          setLoadingAuth(false);
          return;
        }

        const token = JSON.parse(tokenString);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/details`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        const result = await response.json();
        setLoadingAuth(false);

        if (response.ok) {
          setUserDetails(result.data);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem("session_token");
          toast.error(result.msg || "Session expired");
          navigate("/login");
        }
      } catch (error) {
        setSessionError(true);
        setLoadingAuth(false);
        toast.error("Network Error");
        console.log("Session verification failed:", error);
      }
    }

    verifySession();
  }, []);

  // ✅ login function with guaranteed navigation
  async function loginUser(credentials) {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      });

      const result = await response.json();
      setLoading(false);

      if (!response.ok) {
        toast.error(result.msg || "Login failed");
        return;
      }

      // ✅ Save token first
      localStorage.setItem("session_token", JSON.stringify(result.token));

      // ✅ Update user + login state
      setUserDetails(result.user);
      setIsLoggedIn(true);
      toast.success(result.msg || "Login successful");

      // ✅ Navigate after short delay to ensure React updates state
      setTimeout(() => {
        navigate("/");
      }, 100);
    } catch (error) {
      setLoading(false);
      console.error("Error in login:", error);
      toast.error("Network Error");
    }
  }

  async function logout() {
    try {
      const tokenString = localStorage.getItem("session_token");
      if (!tokenString) {
        navigate("/login");
        return;
      }

      const token = JSON.parse(tokenString);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/logout`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token })
      });

      const result = await response.json();
      localStorage.removeItem("session_token");
      setUserDetails(null);
      setIsLoggedIn(false);

      if (response.ok) {
        toast.success(result.msg || "Logged out");
      } else {
        toast.error(result.msg || "Logout failed");
      }

      navigate("/login");
    } catch (error) {
      console.error("Error in logout:", error);
      toast.error("Network Error");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        loading,
        isLoggedIn,
        userDetails,
        loginUser,
        sessionError,
        loadingAuth,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}

export { AuthProvider };
export default useAuth;
