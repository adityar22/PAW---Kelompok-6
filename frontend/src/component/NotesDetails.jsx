import formatDistanceNow from 'date-fns/formatDistanceToNow';
import { format } from 'date-fns';
import { notesReducer } from '../contexts/NotesContext';


// key dari object note perlu diganti lagi untuk model yang berbeda

const NotesDetails = ({ note }) => {
    return (
        <div key={note._id} className="btn-blue cursor-pointer mb-5 mr-5 w-max max-w-[24em]">
            <div className="content-bottom">
                <h2 className='text-xl font-bold text-cyan-700 mb-2'>{note.taskName}</h2>
                <p className="mb-6">{note.taskDescription}</p>
            </div>
            <div className='content-bottom'>
                <p className="badges mb-2">{note.taskPriority}</p>
                <p className="text-xs text-slate-400">Deadline: {note.taskTime}</p>
            </div>
            {/* <p className="badges mb-2">{formatDistanceNow(new Date(note.taskTime), { addSuffix: true })}</p>
            <p className="text-xs text-slate-400">Deadline: {format(new Date(note.taskTime), 'MM/dd/yyyy')}</p> */}
        </div>
    );
}

export default NotesDetails;