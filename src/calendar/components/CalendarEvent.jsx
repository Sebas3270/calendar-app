import React from 'react'
import styled from 'styled-components';

export const CalendarEvent = ({ event }) => {
    
    const { title, description } = event;

    return (
        <EventLayout>
        <Title>{title}</Title>
        <span> - { description }</span>
        </EventLayout>
    )
}

const EventLayout = styled.div`
    color: #e4e4e4;
`

const Title = styled.strong`
    font-weight: 700;
    color: white;
`