import { useState, useRef } from 'react';

import { useNotesContext } from '../hooks/useNotesContext';
import { useDisplayContext } from '../hooks/useDisplayContext';
import useFetch from '../hooks/useFetch';

import Note from '../component/Notes/Note';
import Loading from '../component/Loading'
import AddForm from '../component/Notes/AddForm';
import Searchbar from '../component/Public/Searchbar';

const Notes = () => {
    const { notes, dispatch, isPending, error, setLoading, setError } = useNotesContext();
    const { notify } = useDisplayContext();

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


    return (
        <>
            <div className="py-20 sm:py10 px-10 sm:px-28 h-screen w-full" >
                <div className="my-12 mx-auto" >
                    <h1 className='text-4xl sm:text-5xl font-bold mb-12 text-dark-blue' > Write Your Note Here!📝 </h1>
                    <div className='justify-between flex:row sm:flex'>
                        <button type="button"
                            className="button mb-10 sm:mb-12 mr-10 sm:mr-7 z-10 -bottom-0 -right-0 sm:z-0 fixed sm:relative"
                            onClick={toggleAddPopup}
                        > Add Notes +
                        </button>
                        <Searchbar term={searchTerm} getSearchTerm={getSearchTerm} inputEl={inputEl} />
                    </div>
                    {error && < div className='font-semibold text-lg text-red-400 mt-4' > Somehing error is occured🙀 </div>}
                    {isPending && < Loading />}
                    {listNotes && < div className="mb-5 flex flex-wrap" >
                        {listNotes.map((note) => {
                            return <Note key={note._id}
                                note={note}
                                setLoading={setLoading}
                                setError={setError}
                                notify={notify}
                                isPending={isPending}
                            />
                        })
                        }
                    </div>}
                </div>
            {addPopup && < AddForm toggleAddPopup={toggleAddPopup} setLoading={setLoading} url={url} setError={setError} notify={notify} />}
            </div>
        </>
    );
}

export default Notes;