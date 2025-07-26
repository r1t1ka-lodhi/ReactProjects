import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {login as authLogin} from '../store/authSlice.js'
import {Button, Input, Select}
import {useDispatch} from "react-redux";
import authService from "../appwrite/auth.js";
import {useForm} from "react-hook-form";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const login= async (data) => {
        setError("");
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin(userData));
                }
            }
        } catch (error) {
            setError(error.message);
        }
    }

    const onSubmit = async (data) => {
        try {
            const user = await authService.login(data);
            dispatch(authLogin(user));
            navigate("/");
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return(
        <div>

        </div>

    );
}
export default Login;