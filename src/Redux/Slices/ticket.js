import { createSlice } from "@reduxjs/toolkit";
import { appendItem, removeItem } from "../Reducers/checkList";
import { generateListId } from "../../Utils";
import { editTicket, storeTicket } from "../Reducers/ticket";

export const ticketSlice = createSlice({
    name: "ticket",
    initialState: {
        id: generateListId(8, "NJ"),
        is_empty: true,
        editing: true,
        checklist: [],
    },
    reducers: {
        save: storeTicket,
        apply: () => {},
        delete: () => {},
        edit: editTicket,
        search: () => {},
        appendToList: appendItem,
        removeFromList: removeItem,
    },
});

export const { save, edit, apply, appendToList, removeFromList } = ticketSlice.actions;

export default ticketSlice.reducer;
