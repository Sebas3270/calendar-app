import { addHours } from 'date-fns';
import React from 'react'
import styled from 'styled-components'
import { useUiStore, useCalendarStore } from '../../hooks'

export const AddButton = () => {

    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const handleClickView = () => {
        openDateModal();
        setActiveEvent({
            title: "",
            start: new Date(),
            end: addHours(new Date(), 2),
            description: ''
        });
    }

    return (
        <Button onClick={handleClickView}>
            Add Event
        </Button>
    )
}

const Button = styled.div`
    border: 1px solid #c9c9c9;
    padding: 5px 15px;
    cursor: pointer;
    transition: all 0.2s ease-in;

    &:hover{
        box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    }
`