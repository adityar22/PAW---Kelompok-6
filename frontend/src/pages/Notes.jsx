import { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNotesContext } from '../hooks/useNotesContext';
import useFetch from '../hooks/useFetch';

import Note from '../component/Note';
import Loading from '../component/Loading';
import AddForm from '../component/AddForm';
import Searchbar from '../component/Searchbar';

const Notes = () => {
    const { notes, dispatch, isPending, error, setLoading, setError } = useNotesContext();
    const [addPopup, setAddPopup] = useState(false);

    // Backend URL <-- temporary -->
    const url = '/api/notes';

    // Popup toggle
    const toggleAddPopup = () => {
        setAddPopup(!addPopup);
    }

    // Get Data Hooks
    useFetch({ url, dispatch, setError, setLoading, type: 'GET_NOTES' });

    // Searching Logic
    const [searchTerm, setSearchTerm] = useState("");
    const inputEl = useRef("");
    const [searchResult, setSearchresult] = useState([]);

    const searchHandler = (searchTerm) => {
        setSearchTerm(searchTerm);
        if (searchTerm !== "") {
            const newNotesList = notes.filter((note) => {
                return Object.values(note)
                    .join(" ")
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            });
            console.log(newNotesList);
            setSearchresult(newNotesList);
        } else {
            setSearchresult(notes);
        }
    };

    const getSearchTerm = () => {
        searchHandler(inputEl.current.value);
    };

    const listNotes = searchTerm < 1 ? notes : searchResult


    const notify = {
        info: (msg) => {
            toast.info(msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        },
        error: (msg) => {
            toast.error(msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="py-10 px-28 h-screen">
                <div className="my-12 mx-auto">
                    <h1 className='text-5xl font-bold mb-12 text-dark-blue' >Write your note here! 📝</h1>
                    <div className='justify-start flex'>
                        <button type="button" className="button mb-12 mr-7 z-0" onClick={toggleAddPopup}>Add Notes +</button>
                        <Searchbar term={searchTerm} getSearchTerm={getSearchTerm} inputEl={inputEl} />
                    </div>
                    {error && <div className='font-semibold text-lg text-red-400 mt-4'>Somehing error is occured 🙀</div>}
                    {isPending && <Loading />}
                    {listNotes && <div className="mb-5 flex flex-wrap">{listNotes.map((note, index) => (
                        <Note key={note._id} note={note} setLoading={setLoading} setError={setError} notify={notify}/>
                    ))}</div>}
                </div>
            </div>
            {addPopup && <AddForm toggleAddPopup={toggleAddPopup} setLoading={setLoading} url={url} setError={setError} notify={notify} />}
        </>
    );
}

export default Notes;