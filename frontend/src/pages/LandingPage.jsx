import vector_landing from "../asset/vector_landing.png";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

const Home = () => {
    const { user } = useAuthContext();

    return (
        <div className="py-16 px-2 sm:px-16">
            <div className="flex justify-center items-center mt-24 lg:mt-4"> 
                <div className="py-8 pl-8 sm:pl-0 sm:py-0 w-1/2">
                    <h1 className="text-5xl sm:text-6xl font-bold text-orange">Welcome back,</h1>
                    <h1 className="text-4xl sm:text-6xl font-bold text-dark-blue py-6">{user.username}!</h1>
                    <p className="text-sm sm:text-lg">How's your day {user.username}?</p>
                    <p  className="text-sm mb-8 sm:mb-0 sm:text-lg pb-4 pt-2 sm:pt-1 sm:pb-10">Let's organize your daily college tasks with us ✨</p>
                    <button 
                        text="py-10" className="button sm:text-xl">
                        <Link to="/task">Get Started</Link>
                    </button>
                </div>
                <div className="flex justify-end w-1/2 ml-8"> 
                    <img src={vector_landing} className="hidden lg:block" alt="Task PNG"/>
                </div>

                {/* <ModalConfirm/> */}
            </div>    
        </div>
    );
}

export default Home;