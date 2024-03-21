import { createSlice } from "@reduxjs/toolkit";

const dataDistSlice = createSlice({
    name: "dataDist",
    initialState: {
        user: {},
        tickets: [],
        defaults: {},
    },
    reducers: {
        distribute: (state, action) => {
            const { payload } = action;

            // return;
            if (payload)
                return {
                    ...state,
                    tickets: [...state.tickets, ...payload.data.rows],
                    defaults: {
                        displays: payload.data.displays,
                        statuses: payload.data.statuses,
                        types: payload.data.types,
                        support: payload.data.support,
                        members: payload.data.members,
                    },
                };
        },
    },
});

export const { distribute } = dataDistSlice.actions;

export default dataDistSlice.reducer;
