import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State for keeping if user is authenticated or not and the token.
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);
  const authorizationToken = `Bearer ${token}`;

  const API = import.meta.env.VITE_APP_URI_API;

  const storeTokenInLs = async (serverToken) => {
    setToken(serverToken);
    await userAuthentication();
    return localStorage.setItem("token", serverToken);
  };

  // If token is available it will be true else false
  let isLoggedIn = !!token;
  console.log(`isLoggedIn: ${isLoggedIn}`);

  // handling logout functionality
  const LogoutUser = () => {
    setToken("");
    setUser("");
    return localStorage.removeItem("token");
  };

  // JWT Authentication- to fetch logged in user data
  const userAuthentication = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        // console.log("User data: ", data.userData);
        setUser(data.userData);
        setIsLoading(false);
      } else {
        // console.log("Error fetching user data");
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error fetching user data", error);
    }
  };

  // To fetch the services data from the database
  const getServices = async () => {
    try {
      const response = await fetch(`${API}/api/data/service`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        // console.log("Services data: ", data.message);
        setServices(data.message);
      }
    } catch (error) {
      console.log(`Services frontend-error: ${error}`);
    }
  };

   useEffect(() => {
    getServices();
    if (isLoggedIn) {
      userAuthentication(); // If not logged in Authenticaton will not be called
    } else {
      setIsLoading(false); // Setting loading to false when user is not logged in
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        storeTokenInLs,
        isLoggedIn,
        LogoutUser,
        user,
        services,
        authorizationToken,
        isLoading,
        API,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used ouside of the Provider");
  }
  return authContextValue;
};
