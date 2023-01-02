import React from "react";

const Modal = ({isVisible, onClose, children}) => {
    if( !isVisible ) return null;

    const handleClose = (e) => {
        if( e.target.id === 'wrapper') onClose();
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center'
        id='wrapper' onClick={handleClose}>
            <div className='relative bg-white rounded-lg shadow-lg'>
                <button className="button bg-red-500 border-red-700 place-self-end hover:bg-red-700 absolute -right-4 -top-4" onClick={() => onClose()}>X</button>
                <div className='bg-white p-2 rounded-3xl'>
                    {children}
                </div>
            </div>
        </div> 
    );
};

export default Modal;