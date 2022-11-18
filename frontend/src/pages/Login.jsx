import { useState } from "react";
import { Link } from "react-router-dom";

import { useLogin } from "../hooks/useLogin";

const Login = ({notify}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isPending, error } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await login(email, password);
        
        response.isError ? notify.error(response.message) : notify.info(response.message);
    }


    return (
        <>
            <section className="text-gray-600 body-font mt-5">
                <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
                    <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                        <h1 className="title-font font-medium text-3xl text-gray-900">Welcome back at Task Management</h1>
                        <p className="leading-relaxed mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae consectetur dicta libero fugiat odit tempora impedit harum quidem, aspernatur amet..</p>
                    </div>
                    <form className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0" onSubmit={handleSubmit}>
                        <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Login</h2>
                        <div className="relative mb-4">
                            <label className="leading-7 text-sm text-gray-600">Email</label>
                            <input required
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                type="text"
                                id="email"
                                // name="email" 
                                onChange={(e) => { setEmail(e.target.value) }}
                                value={email}
                            />
                        </div>
                        <div className="relative mb-4">
                            <label className="leading-7 text-sm text-gray-600">Password</label>
                            <input required
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                type="password"
                                id="password"
                                // name="password" 
                                onChange={(e) => { setPassword(e.target.value) }}
                                value={password}
                            />
                        </div>
                        <button disabled={isPending} className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-4">Login</button>
                        <p className="text-sm mx-auto mt-8">
                            Don't have account? <Link to="/signup" className="underline text-blue-500">Sign Up</Link>
                        </p>
                        {error && <p className="text-sm text-red-400 mx-auto font-medium mt-8">{error}</p>}
                    </form>
                </div>
            </section>
        </>
    );
}

export default Login;