import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEventContext } from "../../hooks/useEventContext";

import Datetime from 'react-datetime';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const AddEvent = ({ togglePopup, setLoading, url, setError, notify }) => {
    const { dispatch } = useEventContext();
    const { user } = useAuthContext();

    const [eventName, setEventName] = useState("");
    const [eventDesc, setEventDesc] = useState("");
    const [eventStart, setEventStart] = useState(new Date());
    const [eventEnd, setEventEnd] = useState(new Date());

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            notify.info('You must be logged in');
        }

        const newEvent = { eventName, eventDesc, eventStart, eventEnd }

        setLoading(true);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(newEvent),
        })

        const json = await response.json();

        if (response.ok) {
            setEventName("");
            setEventDesc("");
            setEventStart(new Date());
            setEventEnd(new Date());
            setLoading(false);
            togglePopup();
            dispatch({ type: 'ADD_EVENT', payload: json.data });
            notify.info(json.message);
        }
        if (!response.ok) {
            setLoading(false);
            notify.error(json.error);
        }
    }

    return (
        <>
            <div>
                <div className="overlay z-10"></div>
                <div className="container w-fit mx-auto absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:scale-105 transition-all duration-700">
                    <form className="create w-screen max-w-xl mx-8 bg-white shadow-xl rounded-3xl px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                        <button className="button absolute bg-red-500 border-red-700 -top-4 right-4 hover:bg-red-700" onClick={togglePopup}>x</button>
                        <h3 className="text-center text-2xl font -bold mb-12">Add New Event</h3>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Title
                            </label>
                            <input
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="eventName"
                                type="text"
                                placeholder="Write your event name here..."
                                onChange={(e) => setEventName(e.target.value)}
                                value={eventName}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Description
                            </label>
                            <textarea
                                required
                                className="resize-none shadow border appearance-none rounded w-full h-48 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="eventDesc"
                                placeholder="Write detail event here..."
                                onChange={(e) => setEventDesc(e.target.value)}
                                value={eventDesc}
                            />
                        </div>
                        <div className="flex-row">
                            <div className="inline-block mr-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Event Start
                                </label>
                                <Datepicker
                                    required
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="eventStart"
                                    selected={eventStart}
                                    onChange={date => setEventStart(date)}
                                    showTimeSelect
                                    timeFormat={'p'}
                                    timeIntervals={1}
                                    dateFormat='Pp'
                                />
                            </div>
                            <div className="inline-block">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Event End
                                </label>
                                <Datepicker
                                    required
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="eventEnd"
                                    selected={eventEnd}
                                    onChange={date => setEventEnd(date)}
                                    showTimeSelect
                                    timeFormat={'p'}
                                    timeIntervals={1}
                                    dateFormat='Pp'
                                />
                            </div>
                        </div>
                        <button
                            className=" mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus :outline-none focus:shadow-outline"
                            type="submit">
                            Add New Task
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddEvent;