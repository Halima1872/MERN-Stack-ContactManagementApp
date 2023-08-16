import { configureStore } from "@reduxjs/toolkit";
import contactIdReducer from "./contactIdSlice";
import contactsReducer from "./contactsSlice";

const store = configureStore({
    reducer: {
        contactId: contactIdReducer,
        contacts: contactsReducer
    },
});



export default store;
