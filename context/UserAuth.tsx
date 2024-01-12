"use client";
import axios from "axios";
import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState
} from "react";

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
};

export const TokenContext = createContext<UserData>({} as UserData);

const UserAuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<UserData>({} as UserData);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          const response = await axios.get(
            "http://localhost:3001/api/user/me",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            }
          );
          console.log("API Response:", response); // Log the entire response
          setToken(response.data.user);
        } else {
          console.log("Access token not found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchData();
  }, []);
  return (
    <TokenContext.Provider value={token}>{children}</TokenContext.Provider>
  );
};

export default UserAuthProvider;
