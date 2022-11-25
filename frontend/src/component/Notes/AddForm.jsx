import { useState } from "react";

import { useNotesContext } from "../../hooks/useNotesContext";
import { useAuthContext } from "../../hooks/useAuthContext";

import InputTag from "./InputTag";

const AddForm = ({ toggleAddPopup, setLoading, url, setError, notify }) => {
    const { dispatch } = useNotesContext();
    const { user } = useAuthContext();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isPinned, setIsPinned] = useState(false);
    const [tag, setTag] = useState([]);

    // Add Notes form handling
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            notify.info('You must be logged in');
            return;
        }

        setLoading(true);

        const newTodos = { title, content, isPinned, tag };
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(newTodos),
        })

        const json = await response.json();

        if (response.ok) {
            setTitle('');
            setContent('');
            setLoading(false);
            toggleAddPopup();
            dispatch({ type: 'ADD_NOTES', payload: json.data });
            notify.info(json.message);
        }

        if (!response.ok) {
            setLoading(false);
            // setError(notes.error);
            notify.error(json.error);
        }
    }


    return (
        <>
            <div className="overlay z-10"></div>
            <div className="container w-fit mx-auto fixed z-30 mt-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:hover:scale-105 transition-all duration-700">
                <form className="create w-screen max-w-xl mx-8 bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <div className="flex flex-row justify-between mb-12">
                        <h3 className="text-2xl font-semibold"> Add New Notes </h3>
                        <button onClick={toggleAddPopup} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center ml-4" data-modal-toggle="staticModal">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Title
                        </label>
                        <input
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="title"
                            type="text"
                            placeholder="Write your title here"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Content
                        </label>
                        <textarea
                            required
                            className="resize-none shadow border appearance-none rounded w-full h-48 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="content"
                            placeholder="Write your note here"
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Tags
                        </label>
                        <InputTag tag={tag} setTag={setTag} />
                    </div>
                    <button className="bg-dark-blue hover:bg-blue-800 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Add New Note
                    </button>
                </form>
            </div>
        </>
    );
}

export default AddForm;