import { useState } from "react";
import { useNotesContext } from "../hooks/useNotesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const AddForm = ({ toggleAddPopup, setLoading, url, setError }) => {
    const { dispatch } = useNotesContext();
    const { user } = useAuthContext();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isPinned, setIsPinned] = useState(false);
    const [tag, setTag] = useState(['Important', 'Foods']);

    // Add Notes form handling
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in');
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

        const notes = await response.json();

        if(response.ok){
            setTitle('');
            setContent('');
            setLoading(false);
            toggleAddPopup();
            dispatch({ type: 'ADD_NOTES', payload: notes.data });
        }

        if(!response.ok){
            setLoading(false);
            setError(notes.error);
        }
    }


    return (
        <>
            <div className="overlay z-10"></div>
            <div className="container w-fit mx-auto absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:scale-105 transition-all duration-700">
                <form className="create w-screen max-w-xl mx-8 bg-white shadow-xl rounded-3xl px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <button className="button absolute bg-red-500 border-red-700 -top-4 right-4 hover:bg-red-700" onClick={toggleAddPopup}>x</button>
                    <h3 className="text-center text-2xl font-semibold mb-12"> Add New Notes </h3>
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
                            className="resize-none shadow border appearance-none rounded w-full h-48 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="content"
                            placeholder="Write your note here"
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                        />
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Add New Note
                    </button>
                </form>
            </div>
        </>
    );
}

export default AddForm;