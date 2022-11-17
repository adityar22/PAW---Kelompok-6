import formatDistanceNow from 'date-fns/formatDistanceToNow';
import { format } from 'date-fns';
import { notesReducer } from '../contexts/NotesContext';


// key dari object note perlu diganti lagi untuk model yang berbeda

const NotesDetails = ({ note }) => {
    return (
        <div key={note._id} className="notes-card cursor-pointer mb-7 mr-7 max-w-[24em]">
            <div className="content-bottom">
                <h2 className='text-xl font-bold text-cyan-700 mb-2'>{note.title}</h2>
                <p className="mb-6">{note.content}</p>
            </div>
            <div className='content-bottom'>
                {note.tag.map( (item, index) => {
                    return <p key={index} className="badges mb-2 inline-block">{item}</p>
                })}
                <p className="text-xs text-slate-400">Created at: {format(new Date(note.createdAt), 'MM/dd/yyyy')}</p>
            </div>
            {/* <p className="badges mb-2">{formatDistanceNow(new Date(note.taskTime), { addSuffix: true })}</p>
            <p className="text-xs text-slate-400">Deadline: {format(new Date(note.taskTime), 'MM/dd/yyyy')}</p> */}
        </div>
    );
}

export default NotesDetails;