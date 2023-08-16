import Storage from "./Storage";
import PropTypes from 'prop-types';
import { addContact } from "./redux/contactsSlice";
import { useDispatch } from "react-redux";
const AddContact = ({userId}) => {
    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const newItem = {
            name: e.target[0].value,
            contactNumber: e.target[1].value,
            email: e.target[2].value,
            address: e.target[3].value,
            };
            e.target.reset();

            const response = await Storage.setContact(userId,newItem)
            if(response){
                dispatch(addContact(newItem));
            alert('Contact added successfully!');
            }
    }
    return(
        <div className="div1 event-form mt-3">
          <form  onSubmit={handleSubmit}>
            <h3 className="mt-3">Add Contact</h3>
            <div className="mb-3 container">
            <label className="form-label" htmlFor="name">Name:</label>
            <input className="form-element form-control" type="text" id="name" name="name" 
            required />
            </div>
            <div className="mb-3 container">
            <label className="form-element form-label" htmlFor="contactNumber">Contact Number:</label>
            <input className="form-element form-control" type="number" id="contactNumber" name="contactNumber" 
            required minLength={10} maxLength={10} />

            </div>
            <div className="mb-3 container">
            <label className="form-element form-label" htmlFor="email">Email:</label>
            <input className="form-element form-control" type="email" id="email" name="email"  />
            </div>

            <div className="mb-3 container">
            <label className="form-label" htmlFor="address">Address:</label>
            <input className="form-element form-control" type="text" id="address" name="address"
            required />
            </div>

  
            <div className="mb-3 container">
            <button className="form-element btn btn-primary mb-3" type="submit">Add Contact</button>
            </div>
            
        
        </form>
    </div>
    )


}
AddContact.propTypes = {
    userId: PropTypes.string.isRequired,
    };
export default AddContact;