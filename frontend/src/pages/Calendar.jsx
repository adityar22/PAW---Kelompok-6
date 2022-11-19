import React, { useState, useRef} from "react";
import { useEventContext } from "../hooks/useEventContext";
import useFetch from "../hooks/useFetch";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionGridPlugin from "@fullcalendar/interaction";

import AddEvent from "../component/Event/AddEvent";
import Loading from "../component/Loading";


const Calendar = () => {
    const { events, dispatch, isPending, error, setLoading, setError } = useEventContext();

    const [popup, setPopup] = useState(false);
    const url = "/api/events";

    useFetch({ url, dispatch, setError, setLoading, type: "GET_EVENTS" });
    console.log(events);

    const togglePopup = () => {
        setPopup(!popup);
    };

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
            {popup && <AddEvent togglePopup={togglePopup} setLoading={setLoading} url={url} notify={notify} />}
            <div className="py-10 px-28 w-full" >
                <div className="text-4xl font-bold text-orange my-12 mx-auto">
                    <h1 className='text-5xl font-bold mb-12 text-dark-blue' >Add your events here! 📃</h1>
                </div>
                <div className="align-middle mb-6">
                    <button type="button" className="button mb-3" onClick={togglePopup}>Add Event</button>
                </div>
                {error && <div className='font-semibold text-lg text-red-400 my-4'>Somehing error is occured 🙀</div>}
                {isPending && <Loading />}
                <FullCalendar
                    plugins={
                        [dayGridPlugin, timeGridPlugin, interactionGridPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: "prev next today",
                        center: "title",
                        right: "dayGridMonth timeGridWeek timeGridDay",
                    }}
                    height={700}
                    contentHeight={700}
                    events={events}
                />{" "}
            </div>
        </>
    );
};

export default Calendar;
