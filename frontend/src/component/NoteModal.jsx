const NoteModal = ({toggleDetailPopup, note, handleDelete}) => {
    return (
        <>
            <div className="overlay z-10"></div>
            <div className="z-20 container mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:scale-105 transition-all duration-700 w-fit max-w-1/3">
                <div className="relative w-full max-w-2xl h-full md:h-auto">
                    <div className="relative bg-white rounded-lg shadow-xl">
                        <div className="flex justify-between items-start p-4 rounded-t border-b">
                            <h3 className="text-2xl font-semibold text-gray-900">
                                {note.title}
                            </h3>
                            <button onClick={toggleDetailPopup} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center ml-4" data-modal-toggle="staticModal">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <p className="text-base leading-relaxed text-gray-500">
                                {note.content}
                            </p>
                        </div>
                        <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200">
                            <button type="button" class="text-white bg-dark-blue hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Edit</button>
                            <button type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default NoteModal;