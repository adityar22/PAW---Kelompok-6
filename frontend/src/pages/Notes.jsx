import { useState } from 'react';
import { useNotesContext } from '../hooks/useNotesContext';
import useFetch from '../hooks/useFetch';

import Note from '../component/Note';
import Loading from '../component/Loading';
import AddForm from '../component/AddForm';
import Searchbar from '../component/Searchbar'
import NoteModal from '../component/NoteModal';

const Notes = () => {
    const { notes, dispatch, isPending, error, setLoading, setError } = useNotesContext();
    const [addPopup, setAddPopup] = useState(false);

    const url = '/api/notes';
    
    const toggleAddPopup = () => {
        setAddPopup(!addPopup);
    }

    
    useFetch({ url, dispatch, setError, setLoading, type: 'GET_NOTES' });

    return (
        <>
            {addPopup && <AddForm toggleAddPopup={toggleAddPopup} setLoading={setLoading} url={url} setError={setError} />}
            <div className="py-10 px-28 h-screen">
                <div className="my-12 mx-auto">
                    <h1 className='text-5xl font-bold mb-12 text-dark-blue' >Write your note here! 📝</h1>
                    <div className='justify-between flex'>
                        <button type="button" className="button mb-12 z-0" onClick={toggleAddPopup}>Add Notes +</button>
                        <Searchbar />
                    </div>
                    {error && <div className='font-semibold text-lg text-red-400 mt-4'>Somehing error is occured 🙀</div>}
                    {isPending && <Loading />}
                    {notes && <div className="mb-5 flex flex-wrap">{notes.map((note) => (
                        <Note key={note._id} note={note} setLoading={setLoading} setError={setError}/>
                    ))}</div>}
                </div>
            </div>
        </>
    );
}

export default Notes;