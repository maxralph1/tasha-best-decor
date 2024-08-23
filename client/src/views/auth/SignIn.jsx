import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { route } from '@/routes'; 
import AuthContext from '@/context/AuthContext.jsx';
import Layout from '@/components/public/Layout.jsx'; 


export default function SignIn() { 
    const [emailUsername, setEmailUsername] = useState(''); 
    const [password, setPassword] = useState(''); 

    let { signIn } = useContext(AuthContext); 

    const handleSubmit = async e => {
        e.preventDefault(); 

        signIn(emailUsername, password); 
    }; 

    return (
        <>
            <form onSubmit={ handleSubmit }>
                <div className="form-floating">
                <input 
                    name="email_username"
                    id="email_username" 
                    type="text" 
                    className="form-control" 
                    placeholder="user@user.com / username123" 
                    onChange={e => setEmailUsername(e.target.value)} 
                    required />
                <label htmlFor="email_username">Email / Username</label>
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

                <div className="form-check text-start my-3">
                <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Remember me
                </label>
                </div>

                <button className="btn btn-dark w-100 py-2" type="submit">Sign in</button>
            </form> 
        </>
    )
}
