import React from "react";

const ModalDelete = ({ handleDelete, togglePopup }) => {
    return (
        <div>
            <div className="overlay z-30"></div>
            <div className="mx-auto absolute z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:scale-105 transition-all duration-700">
                <div className="w-max max-w-xl mx-8 bg-white shadow-xl rounded-3xl px-8 pt-6 pb-8 mb-4">
                    <h3 className="font-semibold">Are you sure to delete?</h3>
                    <div className="flex justify-center mt-4">
                        <div className="inline-block mr-3">
                            <button
                                className="bg-slate-300 hover:bg-slate-100 mr-3 text-white font-bold py-2 px-4 rounded focus :outline-none focus:shadow-outline"
                                onClick={togglePopup}>
                                No
                            </button>
                        </div>
                        <div className="inline-block mr-3">
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus :outline-none focus:shadow-outline"
                                onClick={handleDelete}>
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalDelete;