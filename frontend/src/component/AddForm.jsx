import { useState } from "react";
import { useNotesContext } from "../hooks/useNotesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const AddForm = ({ togglePopup, setLoading, url }) => {
    const { dispatch, setError } = useNotesContext();
    const { user } = useAuthContext();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isPinned, setIsPinned] = useState(false);
    const [tag, setTag] = useState(['Important', 'Foods']);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in');
            return;
        }

        const newTodos = { title, content, isPinned, tag };

        setLoading(true);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(newTodos),
        })

        const data = await response.json();

        if(response.ok){
            console.log('New todos added!');
            setTitle('');
            setContent('');
            setLoading(false);
            togglePopup();
            dispatch({ type: 'ADD_NOTES', payload: data });
        }

        if(!response.ok){
            throw Error('Could not fetch the data for that resource');
        }
    }


    return (
        <>
            <div className="overlay z-10"></div>
            <div className="container w-fit mx-auto absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:scale-105 transition-all duration-700">
                <form className="create w-screen max-w-xl mx-8 bg-white shadow-xl rounded-3xl px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <button className="button absolute bg-red-500 border-red-700 -top-4 right-4 hover:bg-red-700" onClick={togglePopup}>x</button>
                    <h3 className="text-center text-2xl font -bold mb-12"> Add New Notes </h3>
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