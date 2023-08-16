import Storage from "./Storage";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Signup.css'
export default function Signup() {
    const navigateTo = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    
        const handleSubmit = async(e) => {
            e.preventDefault()
            const data = await Storage.getUser(username);
            if (data) {
                alert('User already exists! Please register with a different username or Login!');
            }
            else{
            const newItem = {username,email,password,contactNumber};
            const response = await Storage.setUser(newItem)

            if(response){
            setUsername('');
            setEmail('');
            setPassword('');
            alert('User registered successfully! Please login to continue!');
            navigateTo('/Login');
            }
            }
    }
    function redirect() {
        navigateTo('/Login');
    }

    return (
        <div className="div1">
        <form method="post" onSubmit={handleSubmit}>
            <h2 className="mt-3">Register</h2>
            <div className="mb-3 container">
            <label className="form-label" htmlFor="name">Username:</label>
            <input className="form-element form-control" type="text" id="name" name="name" 
            value= {username} required
            onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="mb-3 container">
            <label className="form-element form-label" htmlFor="email">Email:</label>
            <input className="form-element form-control" type="email" id="email" name="email" 
            value= {email} required
            onChange={(e) => setEmail(e.target.value)} />
            </div>
            
            <div className="mb-3 container">
            <label className="form-element form-label" htmlFor="contactNumber">Contact Number:</label>
            <input className="form-element form-control" type="number" id="contactNumber" name="contactNumber" 
            value= {contactNumber} required minLength={10} maxLength={10}
            onChange={(e) => setContactNumber(e.target.value)} />

            </div>
            <div className="mb-3 container">
            <label className="form-element form-label" htmlFor="password">Password:</label>
            <input className="form-element form-control"  aria-describedby="passwordHelpBlock" type="password" id="password" name="password"
            value= {password} required
            onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="mb-3 container">
            <button className="form-element btn btn-primary mb-3" type="submit">Sign Up</button>
            </div>
            <div className="mb-3 ">
            <label  id="already" className="form-label mb-3" htmlFor="login">Already have an account?</label>
            <button className="form-element btn btn-primary mb-3 ms-3 mt-2" onClick={redirect} >Login</button>
            </div>
        </form>
        </div>
    )
}