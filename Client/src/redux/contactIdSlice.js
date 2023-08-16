import { createSlice } from "@reduxjs/toolkit";

const contactIdSlice = createSlice({
    name: "contactId",
    initialState: "",
    reducers: {
        setContactId: (state, action) => {
            return action.payload;
        },
    },
});

export const { setContactId } = contactIdSlice.actions;

export default contactIdSlice.reducer;
