import React ,{useEffect, useState}from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
    
export default function Protected({ children, authentication=true }) {
    const isAuthenticated = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        if (isAuthenticated!==authentication && authentication) {
            navigate("/login");
        } else if(!authentication && isAuthenticated!==authentication) {
            navigate("/login");
        }
        setLoader(false);
    }, [isAuthenticated, authentication, navigate]);


    return loader ? <h1>Loading...</h1> : <>{children}</>
} 