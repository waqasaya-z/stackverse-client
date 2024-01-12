"use client";
import axios from "axios";
import React, { useMemo } from "react";
import { useQuery } from "react-query";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

type User = {
  id: string
  firstName: string;
  lastName: string;
};

const HomePage = () => {
  const accessToken = localStorage.getItem("accessToken");
   
  const fetchUserInfo = async () => {

    const response = await axios.get("http://localhost:3001/api/user/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    console.log(response.data.user)
    return response.data.user;
  }


  const {
    data: user,
    error,
    isLoading
  } = useQuery({
    queryKey: ["userInfo", "firstName"],
    queryFn: fetchUserInfo
  });


  if (error || !user || !user.firstName) {
    return <div>Error fetching user data</div>;
  }

  return (
    <>
      <h1 className="font-semibold text-4xl"> Hello {user.firstName} </h1>
      <SimpleMDE className="w-3/4 h-28" options={{ spellChecker: false,  }} />
    </>
  );
};

export default HomePage;
