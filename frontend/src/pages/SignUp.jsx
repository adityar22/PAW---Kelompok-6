import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignUp } from "../hooks/useSignUp";
import { usePasswordValidation } from "../hooks/usePasswordValidation"

const SignUp = ({ notify }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');

    // Hooks
    const { passwordError, confirmPasswordError, passwordInput, handlePasswordChange, handleValidation } = usePasswordValidation();
    const { signup, isPending, error } = useSignUp();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(email, username, passwordInput.password);
    }

    return (
        <section className="text-gray-600 body-font flex items-center w-screen h-screen">
            <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
                <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                    <h1 className="title-font font-medium text-4xl text-gray-900">Welcome back at <span className="text-orange font-bold">T-Man</span></h1>
                    <p className="leading-relaxed mt-4">Ease your todos planner with <span className="text-orange font-bold">T-Man</span> </p>
                </div>
                <form className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0" onSubmit={handleSubmit}>
                    <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>
                    <div className="relative mb-4">
                        <label className="leading-7 text-sm text-gray-600">Email</label>
                        <input required
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            type="email"
                            id="email"
                            name="email"
                            onChange={(e) => { setEmail(e.target.value) }}
                            value={email}
                        />
                    </div>
                    <div className="relative mb-4">
                        <label className="leading-7 text-sm text-gray-600">Username</label>
                        <input required
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            type="text"
                            id="username"
                            name="username"
                            onChange={(e) => { setUsername(e.target.value) }}
                            value={username}
                        />
                    </div>
                    <div className="relative mb-4">
                        <label className="leading-7 text-sm text-gray-600">Password</label>
                        <input required
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            type="password"
                            id="password"
                            name="password"
                            onChange={handlePasswordChange}
                            onKeyUp={handleValidation}
                            value={passwordInput.password}
                        />
                        {passwordError && <p className="text-sm text-red-400 mx-auto font-medium mt-2"> {passwordError}</p>}
                    </div>
                    <div className="relative mb-4">
                        <label className="leading-7 text-sm text-gray-600">Confirm Password</label>
                        <input required
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            onChange={handlePasswordChange}
                            onKeyUp={handleValidation}
                            value={passwordInput.confirmPassword}
                        />
                        {confirmPasswordError && <p className="text-sm text-red-400 mx-auto font-medium mt-2"> {confirmPasswordError}</p>}
                    </div>
                    <button disabled={!isPending && (confirmPasswordError === passwordError) ? "" : "true"} className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-4 disabled:bg-gray-400">Sign Up</button>
                    <p className="text-sm mx-auto mt-8">
                        Already have an account <Link to="/login" className="underline text-blue-500">Login</Link>
                    </p>
                    {error && <p className="text-sm text-red-400 mx-auto font-medium mt-8"> {error}</p>}
                </form>
            </div>
        </section>
    );
}

export default SignUp;