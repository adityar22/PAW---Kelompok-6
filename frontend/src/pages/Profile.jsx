
const Profile = () => {
    return (
        <div className="px-28 py-10 h-screen">
            <h1 className='text-5xl font-bold mb-12 text-dark-blue' >Account</h1>
            <h1 className='text-2xl font-bold mb-5 text-black' >Personal Info</h1>
            <p className='text-lg text-black' >Name</p>
            <input className="rounded-lg mb-8 bg-gray-200 p-2 w-1/3 focus:border-blue-500 focus:bg-gray-300 focus:outline-orange"></input>
            <p className='text-lg text-black' >Email</p>
            <input className="rounded-lg mb-8 bg-gray-200 p-2 w-1/3 focus:border-blue-500 focus:bg-gray-300 focus:outline-orange"></input>
            <p className='text-lg text-black' >Password</p>
            <button className='text-lg mb-8 text-gray-400 hover:text-gray-300'>Change Password</button>
        
            <div> 
                <button text="py-10" className="button px-10">Update</button>
                <button text="py-10" className="button px-10 ml-10">Cancel</button>
            </div>
            <div className="pt-8"> 
                <button text="py-20" className="btn-white px-24">Delete Account</button>
            </div>
            <div>
                <button text="py-20" className="btn-red mt-8 px-32">Log Out</button>
            </div> 
        </div>
    );
}

export default Profile;