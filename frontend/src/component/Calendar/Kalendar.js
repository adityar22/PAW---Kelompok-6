import { useRef, useState } from "react";
import {
  SevenColGrid,
  Wrapper,
  HeadDays,
  DateControls,
  StyledEvent,
  SeeMore,
} from "./CalStyle";
import { MOCKAPPS } from "./Conts";
import {
  datesAreOnSameDay,
  getDarkColor,
  getDaysInMonth,
  getMonthYear,
  nextMonth,
  prevMonth,
  range,
  sortDays,
} from "./util";

export const Calender = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2022, 9, 1));
  const [events, setEvents] = useState(MOCKAPPS);
  const dragDateRef = useRef();
  const dragindexRef = useRef();

  const addEvent = (date, event) => {
    if (!event.target.classList.contains("StyledEvent")) {
      const text = window.prompt("name");
      if (text) {
        date.setHours(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        setEvents((prev) => [
          ...prev,
          { date, title: text, color: getDarkColor() },
        ]);
      }
    }
  };

  const drag = (index, e) => {
    dragindexRef.current = { index, target: e.target };
  };

  const onDragEnter = (date, e) => {
    e.preventDefault();
    dragDateRef.current = { date, target: e.target.id };
  };

  const drop = (ev) => {
    ev.preventDefault();

    setEvents((prev) =>
      prev.map((ev, index) => {
        if (index === dragindexRef.current.index) {
          ev.date = dragDateRef.current.date;
        }
        return ev;
      })
    );
  };

  return (
    <Wrapper>
      {
        <DateControls>
          {getMonthYear(currentDate)}
          <button
            type="button"
            className="button mb-3"
            onClick={() => prevMonth(currentDate, setCurrentDate)}
          >
            {" "}
            Prev +{" "}
          </button>
          <button
            type="button"
            className="button mb-3"
            onClick={() => nextMonth(currentDate, setCurrentDate)}
          >
            {" "}
            Next +{" "}
          </button>
        </DateControls>
      }
      <SevenColGrid>
        {" "}
        {sortDays(currentDate).map((day) => (
          <HeadDays className="nonDRAG"> {day} </HeadDays>
        ))}
      </SevenColGrid>

      <SevenColGrid
        fullheight={true}
        is28Days={getDaysInMonth(currentDate) === 28}
      >
        {range(getDaysInMonth(currentDate)).map((day) => (
          <div
            id={`${currentDate.getFullYear()}/${currentDate.getMonth()}/${day}`}
            onDragEnter={(e) =>
              onDragEnter(
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  day
                ),
                e
              )
            }
            onDragOver={(e) => e.preventDefault()}
            onDragEnd={drop}
            onClick={(e) =>
              addEvent(
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  day
                ),
                e
              )
            }
          >
            <span
              className={`nonDRAG ${
                datesAreOnSameDay(
                  new Date(),
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    day
                  )
                )
                  ? "active"
                  : ""
              }`}
            >
              {day}
            </span>
            <EventWrapper>
              {" "}
              {events.map(
                (ev, index) =>
                  datesAreOnSameDay(
                    ev.date,
                    new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth(),
                      day
                    )
                  ) && (
                    <StyledEvent
                      onDragStart={(e) => drag(index, e)}
                      draggable
                      className="StyledEvent"
                      id={`${ev.color} ${ev.title}`}
                      key={ev.title}
                      bgColor={ev.color}
                    >
                      {ev.title}
                    </StyledEvent>
                  )
              )}
            </EventWrapper>
          </div>
        ))}
      </SevenColGrid>
    </Wrapper>
  );
};

const EventWrapper = ({ children }) => {
  if (children.filter((child) => child).length)
    return (
      <>
        {children}
        {children.filter((child) => child).length > 2 && (
          <SeeMore
            onClick={(e) => {
              e.stopPropagation();
              console.log("clicked p");
            }}
          >
            see more...
          </SeeMore>
        )}
      </>
    );
};
