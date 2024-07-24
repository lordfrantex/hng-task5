"use client";
import React, { useState, useEffect } from "react";
// import Logo from "../../components/Logo";
// import Envelop from "../../components/Envelop";
// import LockIcon from "../../components/LockIcon";
import Image from "next/image";
import { Lock, Mail } from "lucide-react";
import { auth } from '@/components/firebaseConfig'
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

const Login = () => {
    const router = useRouter()

    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth)
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
    const [isTyping, setIsTyping] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(null);

    const validateForm = () => {
        const newErrors = { email: "", password: "" };
        let isValid = true;

        if (!formValues.email) {
            newErrors.email = "Email is required";
            isValid = false;
        }
        if (!formValues.password) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (formValues.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));

        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        setIsTyping(true);
        setTypingTimeout(
            setTimeout(() => {
                setIsTyping(false);
            }, 500)
        );
    };


    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (validateForm()) {
            setIsTyping(false);
            try {
                // const res = await createUserWithEmailAndPassword(formValues.email, formValues.password)
                // console.log(res);
                router.push('/editor')

            } catch (err) {
                console.log(err);

            }
        }
    };

    useEffect(() => {
        return () => {
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }
        };
    }, [typingTimeout]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
            <div className="relative w-full max-w-md p-8 pt-12 space-y-8 bg-white rounded-lg shadow-md">
                <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
                    {/* <Logo /> */}
                    <Image src='/pics/logo.png' alt="" width={182.5} height={40} />
                </div>
                <form className="space-y-4" >
                    <h2 className="text-2xl font-bold text-left mt-[-50px]">Login</h2>
                    <p className="text-left text-gray-600 whitespace-nowrap">
                        Add your details below to get you back into the app.
                    </p>

                    <div className="relative">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email address
                        </label>
                        <div className="relative mt-1">
                            {/* <Envelop /> */}
                            <Mail width={20} height={20} />

                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formValues.email}
                                onChange={handleChange}
                                className={`w-full h-12 px-4 py-3 border rounded-lg pl-10 ${errors.email ? "border-red-500" : "border-gray-300"
                                    } ${isTyping ? "border-purple-600 shadow-md" : ""}`}
                                placeholder="e.g. alex@example.com"
                            />
                            {errors.email && (
                                <p className="absolute right-4 top-1/2 transform -translate-y-1 text-red-500 text-sm">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="relative">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <div className="relative mt-1">
                            {/* <LockIcon /> */}
                            <Lock width={20} height={20} />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formValues.password}
                                onChange={handleChange}
                                className={`w-full h-12 px-4 py-3 border rounded-lg pl-10 ${errors.password ? "border-red-500" : "border-gray-300"
                                    } ${isTyping ? "border-purple-600 shadow-md" : ""}`}
                                placeholder="Enter your password"
                            />
                            {errors.password && (
                                <p className="absolute right-4 top-1/2 transform -translate-y-1 text-red-500 text-sm">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`w-full h-11 px-6 py-2.5 rounded-lg ${isTyping ? "bg-[#BEADFF]" : "bg-purple-600"
                            } text-white`}
                        disabled={isTyping}
                        onClick={handleSubmit}
                    >
                        Login
                    </button>
                </form>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <a href="/" className="text-blue-600 underline">
                        Create account
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;