import { Fragment, useState } from "react";
import { useLogout } from "../hooks/useLogout";
import { useDisplayContext } from '../hooks/useDisplayContext';
import { useAuthContext } from '../hooks/useAuthContext';

import useFetch from '../hooks/useFetch';
import Modal from "../component/Modal";
// import { useHandleUpdateUser } from "../hooks/useHandleUpdateUser";


const Profile = () => {
    const handleClick = (e) => {
        e.preventDefault();
        logout();
    };

    const { user, dispatch, isPending, error, setLoading, setError } = useAuthContext();
    const { notify } = useDisplayContext();
    const [popup, setPopup] = useState(false);

    const url = '/api/profile/';

    const togglePopup = () => {
        setPopup(!popup);
    }

    // useFetch({ url, dispatch, setError, setLoading, type: 'EDIT_USER' });

    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [isEdited, setIsedited] = useState(false);
    const[confirm, setConfirm] = useState(false);

    // const toggleConfirm=()=>{
    //      setConfirm(!confirm);
    // }

    // const toggleEdit = () => {
    //     setIsedited(!isEdited);
    // }

    // Update handler
    const handleUpdateUser = async (e) => {   
        console.log("quwot");
        e.stopPropagation();
        e.preventDefault();
    
            if (!user) {
                return;
            }
    
            setLoading(true);
            console.log(user)

            const updateUser = { username, email }
            console.log(updateUser)
            const response = await fetch('/api/user/profile/' + user.id, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    // 'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(updateUser)
            });
    
            const json = await response.json();  

            console.log(json.data)
            if (response.ok) {
                // closeDetailPopup();
                setLoading(false);
                dispatch({ type: 'EDIT_USER', payload: json.data });
                togglePopup();
                notify.info(json.message);
            }
            if (!response.ok) {
                setLoading(false);
                setError(json.error);
                notify.error(json.error);
            }
            setLoading(false);
        }

    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const { logout } = useLogout();

    return (
        <Fragment>
        <div className="px-8 py-28 sm:px-28 sm:py-10 h-screen w-screen">
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

            <p className='sm:text-lg text-black' >Password</p>
            <button className='sm:text-lg mb-8 text-gray-400 hover:text-gray-300' 
                onClick={() => setShowModal(true) }>Change Password</button>
        
            <div> 
                <button 
                    text="py-10" 
                    className="button text-sm w-30 md:w-28"
                    onClick={handleUpdateUser}>Update</button>
                <button text="py-10" className="button text-sm w-30 ml-4 md:md-8 md:w-28 md:ml-15">Cancel</button>
            </div>
            <div className="pt-8"> 
                <button text="py-20" className="btn-white text-sm w-40 md:w-60" onClick={() => setShowModal1(true)}>Delete Account</button>
            </div>
            <div>
                <button text="py-20" className="btn-red text-sm mt-4 w-40 md:w-60" onClick={() => setShowModal2(true)}>Log Out</button>
            </div> 
        </div>

        <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
            <div className="py-6 px-6 lg:px-8 text-left">
                <p className='text-lg text-black' >Old Password</p>
                <input required type="password" className="rounded-lg mb-8 bg-gray-200 p-2 w-full focus:border-blue-500 focus:bg-gray-300 focus:outline-orange"></input>
                <p className='text-lg text-black' >New Password</p>
                <input required type="password" className="rounded-lg bg-gray-200 p-2 w-full focus:border-blue-500 focus:bg-gray-300 focus:outline-orange"></input>
            </div>
            <div className="text-center pb-6"> 
                <button text="py-4 mb-2" className="button mx-4">Change Password</button>
            </div>
        </Modal>

        <Modal isVisible={showModal1} onClose={() => setShowModal1(false)}>
            <div className="py-6 px-6 lg:px-8 text-left">
                <h1 className='text-2xl font-bold mb-5 text-black text-center' >Confirm Delete Account</h1>
                <p className='text-lg text-black text-center'>Are you sure you want to delete your account?</p>
            </div>
            <div className="text-center pb-6"> 
                <button text="py-6" className="btn-red px-6 ml-4">Yes, Delete</button>                
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
        </Fragment>
    );
}

export default Profile;