import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionGridPlugin from "@fullcalendar/interaction";

const Calendar = () => {
    return (
        <div className="py-10 px-28 h-screen" >
            <div className="text-4xl font-bold text-orange my-12 mx-auto">
                <h1 className='text-5xl font-bold mb-12 text-dark-blue' >Add your daily task here! 📃</h1>
            </div>
            <FullCalendar plugins={
                [dayGridPlugin, timeGridPlugin, interactionGridPlugin]}
                initialView="dayGridMonth"
                headerToolbar={
                    {
                        left: "prev next today",
                        center: "title",
                        right: "dayGridMonth timeGridWeek timeGridDay",
                    }
                }
                height={600}
                contentHeight={600}
            />{" "}
        </div>
    );
};



export default Calendar;