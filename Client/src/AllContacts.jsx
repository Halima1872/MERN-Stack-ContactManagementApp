import { useState, useEffect } from "react";
import Storage from "./Storage";
import PropTypes from "prop-types";
import EditContact from "./EditContact";
import './AllContacts.css'
import {useDispatch} from 'react-redux';
import {setContactId} from "./redux/contactIdSlice"
import { setContacts,deleteContact } from "./redux/contactsSlice";
import { useSelector } from "react-redux";
const AllContacts = ({ userId }) => {
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts);
    //const [contacts, setContacts] = useState([]);
    const [edit, setEdit] = useState(false);
    //const [contactId, setContactId] = useState("");

    useEffect(() => {
        const getContacts = async () => {
            const data = await Storage.getContacts(userId);
            //setContacts(data);
            dispatch(setContacts(data));
        };
        getContacts();
    }, [userId,dispatch]);

    const handleDelete = async (key) => {
        const isDeleted = await Storage.deleteContact(userId, key);
        if (isDeleted) {
            //const data = await Storage.getContacts(userId);
            //setContacts(data);
            dispatch(deleteContact(key));
            alert("Contact Deleted Successfully");
            location.reload();
        }
    };
    const handleEdit = async (key) => {
        console.log(key);
        dispatch(setContactId(key));
        setEdit(true);
    };

    return (
        <>

            <div className="event-form">

                <div className="contact-card div1">
                    {edit && <EditContact userId={userId} setContacts={setContacts}
                        setEdit={setEdit} />}

                    {contacts.length>0 ? contacts.map((item) => (

                        <div className="card allcards mb-3 " key={item.id}>

                            <div className="card-header mt-0 mb-0">
                                <h5 className="card-title mb-0">{item.name}</h5>
                            </div>
                            <div className="card-body">
                                <div className="row mb-2">
                                    <div className="col-6">Contact Number : {item.contactNumber}</div>
                                    <div className="col-6">Email : {item.email}</div>
                                </div>
                                <div className="col-12">Address: {item.address}</div>
                            </div>
                            <div className="card-footer text-muted">
                                <button className="form-element btn btn-primary ms-3 " onClick={() => {

                                    //setContactId(item._id.toString());
                                    handleEdit(item._id.toString())
                                }}>Edit</button>
                                <button className="form-element btn btn-danger ms-3 " onClick={() => handleDelete(item._id.toString())}>Delete</button>
                            </div>
                        </div>
                    )) : <h1>No Contacts Found</h1>}

                </div>
            </div>
        </>
    );

};
AllContacts.propTypes = {
    userId: PropTypes.string.isRequired,
};
export default AllContacts;