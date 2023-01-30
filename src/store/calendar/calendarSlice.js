import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

export const calendarSlice= createSlice({
    name: 'ui',
    initialState: {
        events: [],
        activeEvent: null,
        isLoadingEvents: true,
    },
    reducers: {
        onLoadEvents: (state, {payload = []}) => {
            state.isLoadingEvents = false;
            state.events = payload;
        },
        onSetActiveEvent: ( state, { payload }) => {
            state.activeEvent = payload;
        },
        onNewEvent: ( state, { payload }) => {
            state.events.push( payload );
            state.activeEvent = null;
        },
        onUpdateEvent: ( state, { payload }) => {
            state.events = state.events.map((event) => {
                if(payload.id === event.id){
                    return payload;
                }
                return event;
            })
        },
        onDeleteEvent: (state) => {
            state.events = state.events.filter(event => event.id !== state.activeEvent.id)
            state.activeEvent = null;
        },
        onClearCalendar: (state) => {
            state.events = [];
            state.activeEvent = null;
            state.isLoadingEvents = true;
        },
    }
});

export const { onSetActiveEvent, onNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents, onClearCalendar } = calendarSlice.actions