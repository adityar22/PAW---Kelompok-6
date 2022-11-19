import React, { useContext } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionGridPlugin from "@fullcalendar/interaction";
import { useState, useEffect, useRef } from "react";
import { useEventContext } from "../hooks/useEventContext";
import useFetch from "../hooks/useFetch";

import AddEvent from "../component/Event/AddEvent";


const Calendar = () => {
    const { events, dispatch, isPending, error, setLoading, setError } = useEventContext();
    const [popup, setPopup] = useState(false);
    const url = "/api/events";

    const togglePopup = () => {
        setPopup(!popup);
    };

    useFetch({ url, dispatch, setError, setLoading, type: "GET_EVENTS" });

    return (
        <>
            {popup && <AddEvent togglePopup={togglePopup} setLoading={setLoading} url={url}/>}
            <div className="py-10 px-28 w-full" >
                <div className="text-4xl font-bold text-orange my-12 mx-auto">
                    <h1 className='text-5xl font-bold mb-12 text-dark-blue' >Add your events here! 📃</h1>
                </div>
                <div className="align-middle mb-6">
                    <button type="button" className="button mb-3" onClick={togglePopup}>Add Event</button>
                </div>
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
                />{" "}
            </div>
        </>
    );
};

export default Calendar;
