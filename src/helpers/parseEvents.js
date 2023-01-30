export const parseEvent = (event) => {
    return { ...event, start: new Date(event.start), end: new Date(event.end) }
}

export const parseEvents = (events) => {
    return events.map(event => {
        return parseEvent(event);
    })
}