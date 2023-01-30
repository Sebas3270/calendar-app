import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../api/calendarApi";
import { parseEvent, parseEvents } from "../helpers";
import { onSetActiveEvent, onNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } from '../store'

export const useCalendarStore = () => {
  
    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector( state => state.calendar )

    const setActiveEvent = ( event ) => {
        dispatch( onSetActiveEvent( event ) ); 
    }

    const addNewEvent = async ( event ) => {
        //TODO: Use backend
        if( event.id ){ //Updating
            const { data } = await calendarApi.put(`/events/${ event.id }`, event)
            const newDate = parseEvent(data)
            dispatch( onUpdateEvent( newDate ) )
        } else { //Creating
            const { data } = await calendarApi.post('/events', event);
            const newDate = parseEvent(data)
            dispatch( onNewEvent( newDate ) )
        }
    }

    const deleteEvent = async (event) => {
        //TODO: Use backend
        try {
            console.log(event.id)
            await calendarApi.delete(`/events/${ event.id }`)
            dispatch( onDeleteEvent() )
        } catch (error) {
            console.error('Error deleting event', error)
        }
        
    }

    const loadEvents = async () => {
        const token = localStorage.getItem('token');
        try {
            const { data } = await calendarApi.get('/events');
            if( !data ) return;
            const newEvents = parseEvents( data )
            dispatch( onLoadEvents(newEvents) );
        } catch (error) {
            console.error('Error loading events', error)
        }
    }

    return {
        // Properties
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        // Events
        loadEvents,
        setActiveEvent,
        addNewEvent,
        deleteEvent,
    }

}
