import React from 'react'
import styled from 'styled-components'
import { useCalendarStore, useUiStore } from '../../hooks';

export const DeleteButton = () => {

  const { deleteEvent, hasEventSelected, activeEvent } = useCalendarStore();
  const { isDateModalOpen } = useUiStore();

  const handleDelete = async() => {
    await deleteEvent(activeEvent)
  }

  return (hasEventSelected ) ? (
    <Button onClick={ handleDelete }>
        Delete Event
    </Button>
  ) : <></>
}

const Button = styled.div`
    /* border: 1px solid #c9c9c9; */
    padding: 5px 15px;
    cursor: pointer;
    transition: all 0.2s ease-in;
    background-color: #b44b4b;
    color: white;

    &:hover{
        box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    }
`