import React from "react";
import {useDispatch} from "react-redux";    
import authService from "../../appwrite/auth.js";
import {logout} from "../../store/authSlice.js";

function LogOutBtn() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await authService.logout().then(() => {
        dispatch(logout());

    });
  };

  return (
    <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleLogout}>
      Log Out
    </button>
  );
}

export default LogOutBtn;
