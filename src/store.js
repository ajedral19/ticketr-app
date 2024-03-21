import { configureStore } from "@reduxjs/toolkit";
import ticketSliceReducer from "./Redux/Slices/ticket";
import modalSliceReducer from "./Redux/Slices/modal";
import dataDistReducer from "./Redux/Slices/dataDist";

export default configureStore({
    reducer: {
        modal: modalSliceReducer,
        dataDist: dataDistReducer,
    },
});
