import { useContext, useState } from 'react'; 
import { Link } from 'react-router-dom';
import { route } from '@/routes'; 
import AuthContext from '@/context/AuthContext.jsx'; 
import Layout from '@/components/public/Layout.jsx'; 

// Put a display: none class (style) on the first name, other names, last name and enterprise name based on the field selected. 
// Since the first and last names are required, add optional words to denote that the name requested is that of the individual registering for the company, in the case of an enterprise registration.


export default function SignUp() { 
    const [email, setEmail] = useState(''); 
    const [username, setUsername] = useState(''); 
    const [firstName, setFirstName] = useState(''); 
    const [otherNames, setOtherNames] = useState(''); 
    const [lastName, setLastName] = useState(''); 
    const [enterpriseName, setEnterpriseName] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [password2, setPassword2] = useState(''); 

    let { signUp } = useContext(AuthContext); 

    const handleSubmit = async e => {
        e.preventDefault(); 

        const account_type = e.target.account_type.value;

        if (password != password2) {
        swal.fire({ 
            text: 'Given passwords do not match', 
            color: "#900000",
            width: 300,
            position: 'top',
            showConfirmButton: false,
        });
        }; 

        signUp(username, email, firstName, otherNames, lastName, enterpriseName, password, account_type); 
    }; 

    return (
        <>
            <form onSubmit={ handleSubmit }> 
                <div className="form-floating mb-3">
                    <select 
                        name="account_type" 
                        id="account_type" 
                        className="form-select" 
                        aria-label="Floating label select example">
                            <option value="individual" defaultValue>Individual</option>
                            <option value="enterprise">Enterprise</option>
                    </select>
                    <label htmlFor="account_type">Account Type</label>
                </div>
                <div className="form-floating">
                <input 
                    name="username"
                    id="username" 
                    type="text" 
                    className="form-control" 
                    placeholder="username123" 
                    onChange={e => setUsername(e.target.value)} 
                    required />
                <label htmlFor="username">Username</label>
                </div>
                <div className="form-floating">
                <input 
                    name="email" 
                    id="email" 
                    type="email" 
                    className="form-control" 
                    placeholder="name@example.com" 
                    onChange={e => setEmail(e.target.value)} 
                    required />
                <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating">
                <input 
                    name="firstName" 
                    id="firstName" 
                    type="text" 
                    className="form-control" 
                    placeholder="John" 
                    onChange={e => setFirstName(e.target.value)} 
                    required />
                <label htmlFor="firstName">First Name</label>
                </div>
                <div className="form-floating">
                <input 
                    name="otherNames" 
                    id="otherNames" 
                    type="text" 
                    className="form-control" 
                    placeholder="John" 
                    onChange={e => setOtherNames(e.target.value)} />
                <label htmlFor="otherNames">Other Names</label>
                </div> 
                <div className="form-floating">
                <input 
                    name="lastName" 
                    id="lastName" 
                    type="text" 
                    className="form-control" 
                    placeholder="John" 
                    onChange={e => setLastName(e.target.value)} 
                    required />
                <label htmlFor="lastName">Last Name</label>
                </div>
                <div className="form-floating">
                    <input 
                        name="enterprise_name" 
                        id="enterprise_name" 
                        type="text" 
                        className="form-control" 
                        placeholder="John Doe Consults" 
                        onChange={e => setEnterpriseName(e.target.value)} />
                    <label htmlFor="enterprise_name">Enterprise Name</label>
                </div>
                <div className="form-floating">
                <input 
                    name="password" 
                    id="password" 
                    type="password" 
                    className="form-control" 
                    placeholder="Password" 
                    onChange={e => setPassword(e.target.value)} 
                    required />
                <label htmlFor="password">Password</label>
                </div>
                <div className="form-floating">
                    <input 
                        id="password2" 
                        type="password" 
                        className="form-control" 
                        placeholder="Repeat password" 
                        onChange={e => setPassword2(e.target.value)} 
                        required />
                    <label htmlFor="password2">Repeat Password</label>
                </div>
                {/* <div className="form-floating">
                    <select 
                        id="account_type" 
                        type="text" 
                        className="form-control" 
                        placeholder="Select account type" 
                        onChange={e => setAccountType(e.target.value)} 
                        required>
                            <option value="individual">Individual</option>
                            <option value="enterprise">Enterprise</option>
                        </select>
                    <label htmlFor="password2">Select Account Type</label>
                </div> */} 

                <div className="text-start my-3">
                </div>

                <button className="btn btn-dark w-100 py-2" type="submit">Sign up</button> 
            </form>
        </>
    )
}
