import React, { useEffect, useState } from 'react'
import { AddButton, CalendarEvent, CalendarModal, DeleteButton, Navbar, } from '../index'

import { addHours } from 'date-fns'

import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { localizer, messages } from '../../helpers/index'
import styled from 'styled-components'
import { useUiStore, useCalendarStore } from '../../hooks'

export const CalendarPage = () => {

  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, loadEvents } =useCalendarStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  const eventGetter = ( event, start, end, isSelected ) => {
    
    const style = {
      background: '#355c7d',  /* fallback for old browsers */
      background: '-webkit-linear-gradient(to right, #355c7d, #6c5b7b, #c06c84)',  /* Chrome 10-25, Safari 5.1-6 */
      background: 'linear-gradient(to right, #355c7d, #6c5b7b, #c06c84)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      border: 'none',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
    
  }

  const onDoubleClick = (event) => {
    openDateModal();
  }

  const onSelect = (event) => {
    setActiveEvent(event);
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event)
  }

  useEffect(() => {
    loadEvents();
  }, []);
  
  return (
    <MainContainer>
      <Navbar />
      <CalendarContainer>
        <ButtonContainer>
          <AddButton/>
          <DeleteButton/>
        </ButtonContainer>
        <Calendar
          localizer={localizer}
          events={events}
          defaultView={ lastView }
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, width: '90%' }}
          messages={messages}
          eventPropGetter={eventGetter}
          components={{
            event: CalendarEvent,
            
          }}
          onDoubleClickEvent={ onDoubleClick }
          onSelectEvent={ onSelect }
          onView={ onViewChanged }
        />

        <CalendarModal/>
      </CalendarContainer>
    </MainContainer>
  )
}

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
`

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  margin-top: 20px;
`

const ButtonContainer = styled.div`

    width: 90%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    margin-bottom: 15px;

`