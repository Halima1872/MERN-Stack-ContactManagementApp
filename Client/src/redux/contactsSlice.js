import {createSlice} from "@reduxjs/toolkit";


const contactsSlice = createSlice({
    
    name: "contacts",
    initialState: [],
    reducers: {
        setContacts: (state, action) => {
            return action.payload;
        },
        addContact: (state, action) => {
            state.push(action.payload);
            
        },
        updateContact: (state, action) => {
            const { id, updatedContact } = action.payload;
            const index = state.findIndex(contact => contact.id === id);
            if (index !== -1) {
                state[index] = { ...state[index], ...updatedContact };
            }
        },
        deleteContact: (state, action) => {
            return state.filter(contact => contact.id !== action.payload);
        }
    }
});

export const { setContacts,addContact, updateContact, deleteContact } = contactsSlice.actions;

export default contactsSlice.reducer;


