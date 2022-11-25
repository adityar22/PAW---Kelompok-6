import React, { useState} from "react";
import { useEventContext } from "../hooks/useEventContext";
import useFetch from "../hooks/useFetch";
import { useDisplayContext } from "../hooks/useDisplayContext";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionGridPlugin from "@fullcalendar/interaction";

import AddEvent from "../component/Event/AddEvent";
import Loading from "../component/Loading";
import { useTasksContext } from "../hooks/useTasksContext";

// import { Calender } from "../component/Calendar/Kalendar";


const Calendar = () => {
    const { tasks, dispatch, isPending, error, setLoading, setError } = useTasksContext();
    const { notify } = useDisplayContext();
    const [popup, setPopup] = useState(false);
    const url = "/api/tasks";

    useFetch({ url, dispatch, setError, setLoading, type: "GET_TASKS" });
    console.log(tasks);

    const togglePopup = () => {
        setPopup(!popup);
    };
    const renderEvent=()=>{
        {tasks && tasks.map(event=>{return(
            <>
                <b>{event.taskName}</b>
                <i>{event.taskTime.Date.parse('yyyy-mm-dd')}</i>
                {console.log(event.taskName)}
                {console.log(event.taskTime.Date.parse('yyyy-mm-dd'))}
            </>
        );
        })}
    }

    return (
        <>
            {popup && < AddEvent togglePopup={togglePopup} setLoading={setLoading} url={url} notify={notify} />}
            <div className="py-10 px-28 w-full h-screen">
                <div className="text-4xl font-bold text-orange my-12 mx-auto" >
                    <h1 className='text-5xl font-bold mb-12 text-dark-blue' > Add Your Events Here!📅 </h1>
                </div>
                <div className="align-middle mb-6" >
                    <button type="button" className="button mb-3" onClick={togglePopup} > Add Event + </button>
                </div>
                {error && < div className='font-semibold text-lg text-red-400 my-4' > Somehing error is occured🙀 </div>}
                {isPending && < Loading />}
                {/* <Calender /> */}
                <FullCalendar
                    //ref={calRef}
                    plugins={
                        [dayGridPlugin, timeGridPlugin, interactionGridPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: "prev next today",
                        center: "title",
                        right: "dayGridMonth timeGridWeek timeGridDay",
                    }}
                    height={700}
                    contentHeight={500}
                    eventContent={
                        {renderEvent}
                    }

                />{" "}
            </div>
        </>
    );
};

export default Calendar;