import vector_landing from "../asset/vector_landing.png";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

const Home = () => {
    const { user } = useAuthContext();

    return (
        <div className="py-16 px-6 lg:px-16 h-screen">
            <div className="flex justify-between lg:justify-center items-center mt-24 lg:mt-4"> 
                <div className="sm:py-0 lg:py-8 pl-0 lg:pl-0 lg:w-1/2 z-10">
                    <h1 className="text-5xl sm:text-6xl font-bold text-orange">Welcome back,</h1>
                    <h1 className="text-4xl sm:text-6xl font-bold text-dark-blue py-6">{user.username}!</h1>
                    <p className="text-sm sm:text-lg">How's your day?</p>
                    <p  className="text-sm mb-8 sm:mb-0 sm:text-lg pb-4 pt-2 sm:pt-1 sm:pb-10">Let's organize your daily college tasks with us ✨</p>
                    <button 
                        text="py-10" className="button sm:text-xl">
                        <Link to="/task">Get Started</Link>
                    </button>
                </div>
                <div className="flex w-1/2 ml-2 justify-center sm:bottom-0 sm:-right-0 sm:opacity-30 lg:opacity-100 sm:fixed lg:relative"> 
                    <img src={vector_landing} className="hidden sm:block" alt="Task PNG"/>
                </div>

                {/* <ModalConfirm/> */}
            </div>    
        </div>
    );
}

export default Home;