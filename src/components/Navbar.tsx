import React from "react";
import { logoutUser } from "../services/auth.services";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user } = useUser();
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      await logoutUser();
    } catch (err: any) {

    }
  }
  return (
    <div>
      {" "}
      {user ? (
        <button onClick={handleLogout}>Log Out</button>
      ) : (
        <button onClick={() => navigate("/login")}>Login</button>
      )}
    </div>
  );
}
