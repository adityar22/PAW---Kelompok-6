import vector_home from "../asset/vector_home.png";
import ModalConfirm from "../component/ModalConfirm";

const Home = () => {
    
    return (
        <div className="p-7 h-screen">
            <div className="flex items-center"> 
                <div className="py-8 pl-8">
                    <h1 className="text-6xl font-bold text-orange">Welcome back,</h1>
                    <h1 className="text-6xl font-bold text-dark-blue py-6">Buddy!</h1>
                    <h1 className="pb-6">Let's organize your daily college tasks with us ✨</h1>
                    <button 
                        text="py-10" className="button">Get Started
                    </button>
                </div>
               
                <div className=" flex justify-end items-center pl-40"> 
                    <img src={vector_home} className="" alt="Task PNG"/>
                </div>

                {/* <ModalConfirm/> */}
            </div>    
        </div>
    );
}

export default Home;