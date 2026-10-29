import React from "react";
import { logoutUser } from "../services/auth.services";
import { useUser } from "../context/UserContext";

function Home() {
  const { user } = useUser();
  return <div>User:{JSON.stringify(user)}</div>;
}

export default Home;
