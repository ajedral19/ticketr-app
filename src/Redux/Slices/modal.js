import { createSlice } from "@reduxjs/toolkit";

const aaa = (state, action) => ({
    ...state,
    show: action.payload.show,
    content: action.payload.content || {},
});

export const modalSlice = createSlice({
    name: "modal",
    initialState: { show: false, content: {} },
    reducers: {
        reveal: aaa,
    },
});

export const { reveal } = modalSlice.actions;

export default modalSlice.reducer;
