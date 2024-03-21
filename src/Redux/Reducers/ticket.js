export const storeTicket = (state, action) => {
    const { payload } = action;
    const { ticketNumber, ticketTitle, ticketType, directive, displays, editing } = payload;

    return {
        ...state,
        is_empty: false,
        ticketNumber: ticketNumber,
        ticketTitle: ticketTitle,
        ticketType: ticketType,
        directive: directive,
        displays: displays,
        editing: editing,
    };
};

export const editTicket = (state, action) => {
    const { payload } = action;
    const { editing } = payload;

    return {
        ...state,
        editing: editing,
    };
};
