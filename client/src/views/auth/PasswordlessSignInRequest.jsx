import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { route } from '@/routes'; 
import AuthContext from '@/context/AuthContext.jsx';
import Layout from '@/components/public/Layout.jsx'; 


export default function PasswordResetRequest() { 
    const [username, setUsername] = useState(''); 

    let { passwordlessSignInRequest } = useContext(AuthContext); 

    const handleSubmit = async e => {
        e.preventDefault(); 

        passwordlessSignInRequest(username); 
    }; 

    return (
        <Layout>
            <form  onSubmit={ handleSubmit }>
                <div className="form-floating">
                <input 
                    name="username"
                    id="username" 
                    type="text" 
                    className="form-control" 
                    placeholder="user123" 
                    onChange={e => setUsername(e.target.value)} 
                    required />
                <label htmlFor="username">Username</label>
                </div>

                <div className="text-start my-3">
                </div>

                <button className="btn btn-dark w-100 py-2" type="submit">Receive Sign In Link</button> 
            </form> 
        </Layout>
    )
}
