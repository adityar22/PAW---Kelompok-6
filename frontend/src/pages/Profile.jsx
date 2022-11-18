import { Fragment, useState } from "react";
import { useLogout } from "../hooks/useLogout";
import Modal from "../component/Modal";
import { useAuthContext } from "../hooks/useAuthContext";

const Profile = () => {
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const handleClick = (e) => {
        e.preventDefault();
        logout();
    };

    return (
        <Fragment>
        <div className="px-28 py-10 h-screen">
            <h1 className='text-5xl font-bold mb-12 text-dark-blue' >Account</h1>
            <h1 className='text-2xl font-bold mb-5 text-black' >Personal Info</h1>
            <p className='text-lg text-black' >Name</p>
            <input className="bg-gray-200 border text-sm rounded-lg focus:border-blue-500 focus:bg-gray-300 block w-full p-2.5 mb-8 focus:outline-orange" placeholder={user.username}></input>
            <p className='text-lg text-black' >Email</p>
            <input className="bg-gray-200 border text-sm rounded-lg focus:border-blue-500 focus:bg-gray-300 block w-full p-2.5 mb-8 focus:outline-orange" placeholder={user.email}></input>
            <p className='text-lg text-black' >Password</p>
            <button className='text-lg mb-8 text-gray-400 hover:text-gray-300' onClick={() => setShowModal(true) }>Change Password</button>
        
            <div> 
                <button text="py-10" className="button px-10">Update</button>
                <button text="py-10" className="button px-10 ml-10">Cancel</button>
            </div>
            <div className="pt-8"> 
                <button text="py-20" className="btn-white px-24" onClick={() => setShowModal1(true) }>Delete Account</button>
            </div>
            <div>
                <button text="py-20" onClick={handleClick} className={'logout btn-red mt-8 px-32 ${!open && "scale-0"}'}>Log Out</button>
            </div> 
        </div>

        <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
            <div className="py-6 px-6 lg:px-8 text-left">
                <p className='text-lg text-black' >Old Password</p>
                <input required type="password" className="rounded-lg mb-8 bg-gray-200 p-2 w-full focus:border-blue-500 focus:bg-gray-300 focus:outline-orange"></input>
                <p className='text-lg text-black' >New Password</p>
                <input required type="password" className="rounded-lg bg-gray-200 p-2 w-full focus:border-blue-500 focus:bg-gray-300 focus:outline-orange"></input>
            </div>
            <div className="text-center py-6"> 
                <button text="py-6" className="button px-10">Change Password</button>
            </div>
        </Modal>

        <Modal isVisible={showModal1} onClose={() => setShowModal1(false)}>
            <div className="py-6 px-6 lg:px-8 text-left">
                <h1 className='text-2xl font-bold mb-5 text-black text-center' >Confirm Delete Account</h1>
                <p className='text-lg text-black text-center'>Are you sure you want to delete your account?</p>
            </div>
            <div className="text-center pb-6"> 
                <button text="py-6" className="btn-red px-10">Delete</button>
            </div>
        </Modal>
        </Fragment>
    );
}

export default Profile;