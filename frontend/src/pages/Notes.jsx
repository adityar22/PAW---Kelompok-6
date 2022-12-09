import { useState } from 'react';

import { useNotesContext } from '../hooks/useNotesContext';
import { useDisplayContext } from '../hooks/useDisplayContext';
import { useSearch } from '../hooks/useSearch';
import useFetch from '../hooks/useFetch';

import Note from '../component/Notes/Note';
import Loading from '../component/Loading';
import AddForm from '../component/Notes/AddForm';
import Searchbar from '../component/Public/Searchbar';

const Notes = () => {
    const { notes, dispatch } = useNotesContext();
    const { notify, isPending, error, setLoading, setError } = useDisplayContext();

    const [addPopup, setAddPopup] = useState(false);

    // Backend URL <-- temporary -->
    const url = '/api/notes';

    // Popup toggle
    const openAddPopup = () => {
        setAddPopup(true);
    }

    const closeAddPopup = () => {
        setAddPopup(false);
    }

    // Hooks
    useFetch({ url, dispatch, setError, setLoading, type: 'GET_NOTES' });

    // Search
    const { searchResult, getSearchTerm, inputEl, searchTerm } = useSearch(notes);
    const listNotes = searchTerm < 1 ? notes : searchResult;

    return (
        <>
            <div className="py-20 lg:py-10 px-3 lg:px-28 h-screen" >
                <div className="my-12 mx-auto" >
                    <h1 className='text-4xl sm:text-5xl font-bold mb-12 text-dark-blue' > Write Your Note Here!📝 </h1>
                    <div className='justify-between flex:row sm:flex'>
                        <button type="button"
                            className="button mb-10 sm:mb-12 mr-10 sm:mr-7 z-10 -bottom-0 -right-0 sm:z-0 fixed sm:relative"
                            onClick={openAddPopup}
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
                {addPopup && < AddForm openAddPopup={openAddPopup} closeAddPopup={closeAddPopup} setLoading={setLoading} url={url} setError={setError} notify={notify} />}
            </div>
        </>
    );
}

export default Notes;