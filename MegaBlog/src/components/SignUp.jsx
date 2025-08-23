
import React,{ useState} from "react";
import authService from "../appwrite/auth.js";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./indes.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";


function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const create =async(data) =>{
        setError("");
        try {
            const user = await authService.createAccount(data);
            console.log("Signup response:", user); 
            if (user) {
                const userData= await authService.getCurrentUser();
                console.log("Current user:", userData);
                if(userData) {
                    dispatch(login(userData));
                }
                navigate("/");
            }
        } catch (error) {
            console.error("Signup failed:", error); 
            setError(error.message || "Signup failed");
        }
    }
    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign up to create your account
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link to="/login" className="font-semibold text-blue-500">
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(create)} className="mt-8">
                    <div className="space-y-5">
                        <Input
                            label="Name:"
                            placeholder="Enter your name"
                            {...register("name", { required: true })}
                        />
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", { 
                                required: true, 
                                validate:{
                                    matchPatern: (value) =>/^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/
                                    .test(value) || "Invalid email format"
                                }                          
                            })}
                        />
                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            {...register("password", { required: true })}
                        />
                        <Button
                            type="submit"
                            className="w-full "
                        >
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;