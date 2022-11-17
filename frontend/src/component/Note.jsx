import { useState } from 'react';
import { format } from 'date-fns';

import { useNotesContext } from '../hooks/useNotesContext';
import { useAuthContext } from '../hooks/useAuthContext';

import NoteModal from './NoteModal';
import ModalConfirm from './ModalConfirm';

const Note = ({ note, setLoading, setError, notify}) => {
    const { dispatch } = useNotesContext();
    const { user } = useAuthContext();
    const wordLimit = 200;

    const [detailPopup, setDetailPopup] = useState(false);

    const toggleDetailPopup = () => {
        setDetailPopup(!detailPopup);
    }

    const handleDelete = async (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (!user) {
            return;
        }

        setLoading(true);
        const response = await fetch('/api/notes/' + note._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if (response.ok) {
            setLoading(false);
            dispatch({ type: 'DELETE_NOTES', payload: json.data });
            notify.info(json.message);
        }
        if (!response.ok) {
            setLoading(false);
            // setError(json.error);
            notify.error(json.error);
        }

    }

    return (
        <>
            <div className="notes-card mb-7 mr-7 max-h-fit max-w-xl" onClick={toggleDetailPopup}>
                <div className="content-top">
                    <div className='flex flex-row justify-between mb-2'>
                        <h2 className='text-xl font-bold text-cyan-700'>{note.title}</h2>
                        <span className='ml-7 cursor-pointer' onClick={handleDelete}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 stroke-red-500">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </span>
                    </div>
                    <div>
                        <p className="mb-6">
                            {note.content.length > wordLimit ?
                                <p>{note.content.substr(0, wordLimit)} . . .<span className="ml-3 cursor-pointer underline text-blue-400 inline-block">Click to read more</span></p>
                                :
                                note.content}
                        </p>
                    </div>
                </div>
                <div className='content-bottom'>
                    {note.tag.map((item, index) => {
                        return <p key={index} className="badges mb-2 inline-block">{item}</p>
                    })}
                    <p className="text-xs text-slate-400">Created at: {format(new Date(note.createdAt), 'MM/dd/yyyy')}</p>
                </div>
            </div>
            {/* Just show last modal */}
            {(detailPopup) && <NoteModal toggleDetailPopup={toggleDetailPopup} note={note} handleDelete={handleDelete} setLoading={setLoading} setError={setError} notify={notify}/>}
        </>
    );
}

export default Note;