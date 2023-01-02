import { Fragment, useState } from "react";
import { useLogout } from "../hooks/useLogout";

import { useDisplayContext } from '../hooks/useDisplayContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useHandleUpdateUser} from '../hooks/useHandleUpdateUser';
import { useHandleDeleteUser} from '../hooks/useHandleDeleteUser';

import Modal from "../component/Modal";

const Profile = () => {
    const handleClick = (e) => {
        e.preventDefault();
        logout();
    };

    const { user, dispatch } = useAuthContext();
    const { notify, isPending, error, setLoading, setError } = useDisplayContext();
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);

    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const { logout } = useLogout();

    const updateUser = { username, email };
    const { handleUpdateUser } = useHandleUpdateUser({ updateUser: updateUser, dispatch, setLoading, setError, notify, setShowModal3 });
    const { handleDeleteUser } = useHandleDeleteUser({ logout, dispatch, setLoading, setError, notify });

    return (
        <Fragment>
            <div className="py-20 lg:py-10 px-3 lg:px-28 h-screen">
                <div className="my-12 mx-auto">

                    <h1 className='sm:text-5xl font-bold mb-8 sm:mb-12 text-dark-blue text-4xl'
                    >Account 👥</h1>
                    <h1 className='sm:text-2xl font-bold mb-5 text-black text-xl'
                    >Personal Info</h1>
                    <p className='sm:text-lg text-black' >Name</p>
                    <input
                        required
                        className="bg-gray-200 border text-sm rounded-lg focus:border-blue-500 focus:bg-gray-300 block w-full sm:w-3/4 md:w-1/2 lg:w-1/3 p-2.5 mb-8 focus:outline-orange"
                        id="username"
                        type="text"
                        defaultValue={username}
                        onChange={(e) => setUsername(e.target.value)}>
                    </input>

                    <p className='sm:text-lg text-black' >Email</p>
                    <input className="bg-gray-200 border text-sm rounded-lg focus:border-blue-500 focus:bg-gray-300 block w-full sm:w-3/4 md:w-1/2 lg:w-1/3 p-2.5 mb-8 focus:outline-orange"
                        required
                        id="email"
                        type="text"
                        defaultValue={email}
                        onChange={(e) => setEmail(e.target.value)}></input>

                    <div>
                        <button
                            text="py-10"
                            className="button text-sm w-40 md:w-60"
                            onClick={() => setShowModal3(true)}>Update</button>
                    </div>
                    <div className="pt-8">
                        <button text="py-20" className="btn-white text-sm w-40 md:w-60" onClick={() => setShowModal1(true)}>Delete Account</button>
                    </div>
                    <div>
                        <button text="py-20" className="btn-red text-sm mt-4 w-40 md:w-60" onClick={() => setShowModal2(true)}>Log Out</button>
                    </div>
                </div>

                <Modal isVisible={showModal1} onClose={() => setShowModal1(false)}>
                    <div className="py-6 px-6 lg:px-8 text-left">
                        <h1 className='text-2xl font-bold mb-5 text-black text-center' >Confirm Delete Account</h1>
                        <p className='text-lg text-black text-center'>Are you sure you want to delete your account?</p>
                    </div>
                    <div className="text-center pb-6">
                        <button text="py-6" onClick={handleDeleteUser} className="btn-red px-6 ml-4">Yes, Delete</button>
                        <button text="py-6" onClick={() => setShowModal1(false)} className="button ml-4 px-6">No, Cancel</button>
                    </div>
                </Modal>

                <Modal isVisible={showModal2} onClose={() => setShowModal2(false)}>
                    <div className="py-6 px-6 lg:px-8 text-left">
                        <h1 className='text-2xl font-bold mb-5 text-black text-center' >Confirm Log Out</h1>
                        <p className='text-lg text-black text-center'>Are you sure you want to log out?</p>
                    </div>
                    <div className="text-center pb-6">
                        <button text="py-6" onClick={handleClick} className={`logout btn-red px-6 ml-4 mr-2`}>Yes, I'm Sure</button>
                        <button text="py-6" onClick={() => setShowModal2(false)} className="button px-6 ml-4">No, Cancel</button>
                    </div>
                </Modal>

                <Modal isVisible={showModal3} onClose={() => setShowModal3(false)}>
                    <div className="py-6 px-6 lg:px-8 text-left">
                        <h1 className='text-2xl font-bold mb-5 text-black text-center' >Confirm Update</h1>
                        <p className='text-lg text-black text-center'>Are you sure you want to update your profile?</p>
                    </div>
                    <div className="text-center pb-6">
                        <button text="py-6" onClick={handleUpdateUser} className={`logout btn-red px-6 ml-4 mr-2`}>Yes, I'm Sure</button>
                        <button text="py-6" onClick={() => setShowModal3(false)} className="button px-6 ml-4">No, Cancel</button>
                    </div>
                </Modal>
            </div>
        </Fragment>
    );
}

export default Profile;