import { useState } from 'react';
import { format } from 'date-fns';

import { useNotesContext } from '../../hooks/useNotesContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useHandleUpdate } from '../../hooks/useHandleUpdate';

import NoteModal from './NoteModal';
import ModalDelete from '../Public/ModalDelete';

const Note = ({ note, setLoading, setError, notify }) => {
    const [detailPopup, setDetailPopup] = useState(false);
    const [confirmPopup, setConfirmPopup] = useState(false);
    const editedNotes = { ...note, isPinned: !note.isPinned }
    const wordLimit = 200;

    const openDetailPopup = () => {
        setDetailPopup(true);
    }

    const closeDetailPopup = () => {
        setDetailPopup(false);
    }

    const toggleConfirmPopup = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setConfirmPopup(!confirmPopup);
    }

    const { dispatch } = useNotesContext();
    const { user } = useAuthContext();
    const { update } = useHandleUpdate(note, editedNotes, setLoading, setError, notify, closeDetailPopup);

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

    const handlePinned = (e) => {
        e.stopPropagation();
        e.preventDefault();
        update(detailPopup);
    }


    return (
        <>
            <div className="notes-card mb-7 mr-7 max-h-fit max-w-xl" onClick={(openDetailPopup)}>
                <div className="content-top">
                    <div className='flex flex-row justify-between mb-2'>
                        <h2 className='text-xl font-bold text-cyan-700'>{note.title}</h2>
                        <div className="ml-7 note-icons">
                            <span className='inline-block cursor-pointer' onClick={handlePinned}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${note.isPinned && "fill-yellow-500"} stroke-yellow-500`}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                            </span>
                            <span className='inline-block ml-2 cursor-pointer' onClick={toggleConfirmPopup}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-red-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div>
                        <p className="mb-6 whitespace-pre-wrap">
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
            {detailPopup && <NoteModal closeDetailPopup={closeDetailPopup} note={note} handleDelete={handleDelete} setLoading={setLoading} setError={setError} notify={notify} />}
            {confirmPopup && <ModalDelete togglePopup={toggleConfirmPopup} handleDelete={handleDelete} />}
        </>
    );
}

export default Note;