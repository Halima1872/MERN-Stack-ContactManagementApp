//import { useLocation } from "react-router-dom";
import { useState,useEffect } from "react";

import AddContact from "./AddContact";
import AllContacts from "./AllContacts";
import Storage from "./Storage";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
const Welcome = ({userId}) => {
    const navigateTo = useNavigate();   
    
    const [showAddContact, setShowAddContact] = useState(false);
    const [showAllContacts, setShowAllContacts] = useState(true);
    const [currentUser, setCurrentUser] = useState("");
    useEffect(() => {
        const getUser = async () => {
            const data = await Storage.getUserWithId(userId);
            setCurrentUser(data.username);
        };
        getUser();
    }, [userId]);

    const handleLogout = async() => {
        const response = await Storage.doLogout();
        if(response){
            alert("Logged Out Successfully");
            //window.location.href = '/Login';
            navigateTo('/Login');
        }else{
            alert("Failed to Logout");
        } 
    }
    return (
        <>
        <nav className="navbar mb-3 navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" >Welcome, {currentUser}</a>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
        </li>
        <li className="nav-item">
        <button className="nav-link active" aria-current="page" onClick={() => {
            setShowAddContact(true) 
            setShowAllContacts(false)
        }}>Add New Contacts</button>
        </li>
        <li className="nav-item">
        <button className="nav-link active" aria-current="page" onClick={() => {
            setShowAllContacts(true) 
            setShowAddContact(false)
        }}>View All Contacts</button>
        </li>
        </ul>
        <ul className="navbar-nav ms-auto">
        <li className="nav-item">
        <button className="nav-link active" aria-current="page" onClick={handleLogout}>Logout</button>
        </li>
        
      </ul>
    </div>
    
    </div>
    
        
      
    
</nav>
            
        {showAddContact && <AddContact userId={userId} />}
        {showAllContacts && <AllContacts userId={userId} />}
      
        </>
    )
}
Welcome.propTypes = {
    userId: PropTypes.string.isRequired,
};
export default Welcome;