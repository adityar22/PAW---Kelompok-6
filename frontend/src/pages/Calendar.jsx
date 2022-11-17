import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionGridPlugin from '@fullcalendar/interaction'

const Calendar = () => {
    return ( <
        div className = "py-10 px-28 h-screen" >
        <
        FullCalendar plugins = {
            [dayGridPlugin, timeGridPlugin, interactionGridPlugin]
        }
        initialView = 'dayGridMonth'
        headerToolbar = {
            {
                left: 'prev, next, today',
                center: 'title',
                right: 'dayGridMonth, timeGridWeek, timeGridDay',
            }
        }
        height = { 700 }
        contentHeight = { 700 }
        />      <
        /div>
    );
}

export default Calendar;