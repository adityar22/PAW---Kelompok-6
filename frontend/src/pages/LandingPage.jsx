import vector_home from "../asset/vector_home.png";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

const Home = () => {
    const { user } = useAuthContext();

    return (
        <div className="p-7 h-screen">
            <div className="flex items-center mt-36"> 
                <div className="py-8 pl-8 w-full">
                    <h1 className="text-6xl font-bold text-orange">Welcome back,</h1>
                    <h1 className="text-6xl font-bold text-dark-blue py-6">{user.username}!</h1>
                    <h1 className="pb-6">Let's organize your daily college tasks with us ✨</h1>
                    <button 
                        text="p-10" className="button text-xl">
                        <Link to="/task">Get Started</Link>
                    </button>
                </div>
               
                <div className=" flex justify-end items-center pl-20"> 
                    <img src={vector_home} className="" alt="Task PNG"/>
                </div>

                {/* <ModalConfirm/> */}
            </div>    
        </div>
    );
}

export default Home;