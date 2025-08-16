import React ,{useEffect, useState}from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
    
export default function Protected({ children, authentication=true }) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated && authentication) {
            navigate("/login");
        }
    }, [isAuthenticated, authentication, navigate]);

    return (
        <div className="auth-layout">
            {authentication ? children : <div>Please log in to access this content.</div>}
        </div>
    );
}