import { useState } from "react";

import { useHandleUpdate } from "../../hooks/useHandleUpdate";

import InputTag from "./InputTag";
import ModalDelete from "../Public/ModalDelete";

const NoteModal = ({ closeDetailPopup, note, handleDelete, setLoading, setError, notify }) => {

    const [isEdited, setIsEdited] = useState(false);
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [isPinned, setIsPinned] = useState(note.isPinned);
    const [tag, setTag] = useState(note.tag);
    const [confirmPopup, setConfirmPopup] = useState(false);

    const toggleConfirmPopup = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setConfirmPopup(!confirmPopup);
    }

    const toggleEdit = () => {
        setIsEdited(!isEdited);
    }

    const updatedNote = { title, content, isPinned, tag };
    const { handleUpdate } = useHandleUpdate(note, updatedNote, setLoading, setError, notify, closeDetailPopup);

    return (
        <>
            <div className="overlay z-10 "></div>
            <div className="container w-screen sm:w-max mx-auto fixed z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:hover:scale-105 transition-all duration-700">
                <div className="relative w-full max-w-2xl md:h-auto">
                    <div className="relative bg-white rounded-lg shadow-xl hover:scale-105 transition-all duration-700">
                        <div className="flex justify-between items-start p-4 rounded">
                            {isEdited ?
                                <input required
                                    className="text-2xl font-semibold text-gray-900 border border-gray-400 rounded-lg w-full"
                                    id="title"
                                    type="text"
                                    defaultValue={note.title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                :
                                <h3 className="text-2xl font-semibold text-gray-900">
                                    {note.title}
                                </h3>
                            }
                            <button onClick={closeDetailPopup} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center ml-4">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            {isEdited ?
                                <textarea
                                    className="resize-none shadow border appearance-none rounded w-full h-52 py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline"
                                    id="content"
                                    defaultValue={note.content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                                :
                                <p className="text-base leading-relaxed whitespace-pre-wrap">
                                    {note.content}
                                </p>
                            }
                        </div>

                        <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200">
                            {isEdited ?
                                <>
                                    <InputTag tag={tag} setTag={setTag} />

                                </>
                                :
                                <>
                                    {note.tag.map((item, index) => {
                                        return <p key={index} className="badges text-sm inline-block">{item}</p>
                                    })}
                                </>
                            }
                        </div>

                        <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200">
                            {isEdited ?
                                <>
                                    <button type="button"
                                        className="text-white bg-green-500 hover:bg-green-700-100 active:ring-4 active:outline-none active:ring-green-300 rounded-lg border border-green-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 hover:bg-green-700 focus:z-10"
                                        onClick={handleUpdate}>Update Note</button>
                                    <button type="button"
                                        className="text-gray-500 bg-white hover:bg-gray-100 active:ring-4 active:outline-none active:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                                        onClick={toggleEdit}>Back</button>
                                </>
                                :
                                <>
                                    <button type="button"
                                        className="text-white bg-dark-blue hover:bg-blue-900 active:ring-4 active:outline-none active:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                        onClick={toggleEdit}>Edit</button>
                                    <button type="button"
                                        className="text-gray-500 bg-white hover:bg-gray-100 active:ring-4 active:outline-none active:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                                        onClick={toggleConfirmPopup}>Delete</button>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {confirmPopup && <ModalDelete togglePopup={toggleConfirmPopup} handleDelete={handleDelete} />}

        </>
    );
}

export default NoteModal;