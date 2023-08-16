import Storage from "./Storage";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {useSelector} from 'react-redux';
import { updateContact } from "./redux/contactsSlice";
import { useDispatch } from "react-redux";
const EditContact = ({ userId,setEdit }) => {
    const dispatch = useDispatch();
    const contactId = useSelector((state) => state.contactId);
    const [contact, setContact] = useState({});
    useEffect(() => {
        const getContact = async () => {
            const data = await Storage.getContact(userId, contactId);
            setContact(data);
        };
        getContact();
    }, [userId, contactId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const contactNumber = e.target.contactNumber.value;
        const email = e.target.email.value;
        const address = e.target.address.value;
        const isUpdated = await Storage.updateContact(userId, contactId, {
            name,
            contactNumber,
            email,
            address,
        });
        if (isUpdated) {
            dispatch(updateContact({ id: contactId, updatedContact: { name, contactNumber, email, address } }));
            //const data = await Storage.getContacts(userId);
            //setContacts(data);
            alert("Contact Updated Successfully");
            location.reload();
            setEdit(false);
        }
    }


    return (
        <div className="event-form div1">
            <form  onSubmit={handleSubmit}>
            <h3 className="mt-3">Edit Contact</h3>
            <div className="mb-3 container">
            <label className="form-label" htmlFor="name">Name:</label>
            <input className="form-element form-control" type="text" id="name" name="name" 
            required value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} />
            </div>
            <div className="mb-3 container">
            <label className="form-element form-label" htmlFor="contactNumber">Contact Number:</label>
            <input className="form-element form-control" type="number" id="contactNumber" name="contactNumber" 
            required minLength={10} maxLength={10} value={contact.contactNumber} onChange={(e) => setContact({ ...contact, contactNumber: e.target.value })}
            />

            </div>
            <div className="mb-3 container">
            <label className="form-element form-label" htmlFor="email">Email:</label>
            <input className="form-element form-control" type="email" id="email" name="email"  
            required value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })}/>
            </div>

            <div className="mb-3 container">
            <label className="form-label" htmlFor="address">Address:</label>
            <input className="form-element form-control" type="text" id="address" name="address"
            required value={contact.address} onChange={(e) => setContact({ ...contact, address: e.target.value })}/>
            </div>

            <div className="mb-3 container">
            <button className="form-element btn btn-primary mb-3 ms-6 " type="submit">Edit Contact</button>
            <button className="form-element btn btn-danger mb-3 ms-3" onClick={()=> setEdit(false)}>Cancel</button>
            </div>
        </form> 
        </div>
    );
};
EditContact.propTypes = {
    userId: PropTypes.string.isRequired,
    setContacts: PropTypes.func.isRequired,
    setEdit: PropTypes.func.isRequired,
};

export default EditContact;
