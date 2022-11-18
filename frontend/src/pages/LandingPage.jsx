import vector_home from "../asset/vector_home.png";
import { Link } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
    const { user } = useAuthContext();

    return (
        <div className="py-10 px-20 lg:px-28 h-screen">
            <div className="my-12 mx-auto">
                <div className="flex items-center justify-between flex-col-reverse text-md lg:flex-row lg:text-base">
                    <div className="py-8 pl-8 self-start lg:self-center">
                        <h1 className="text-4xl  font-bold text-orange lg:text-6xl">Welcome back,</h1>
                        <h1 className="text-4xl  py-3 font-bold text-dark-blue lg:text-6xl lg:py-6">{user.username ? user.username : <>Buddy!</>}</h1>
                        <h1 className="pb-6">Let's organize your daily college tasks with us ✨</h1>
                        <Link to="/task"><button className="button">Get Started</button></Link>
                    </div>
                    <div className="block">
                        <img src={vector_home} alt="Task PNG" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;