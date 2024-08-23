import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { route } from '@/routes'; 
import AuthContext from '@/context/AuthContext.jsx';
import Layout from '@/components/public/Layout.jsx'; 


export default function PasswordResetRequest() { 
    const [email, setEmail] = useState(''); 

    let { resetPasswordRequest } = useContext(AuthContext); 

    const handleSubmit = async e => {
        e.preventDefault(); 

        resetPasswordRequest(email); 
    }; 

    return (
        <Layout>
            <form  onSubmit={ handleSubmit }>
                <div className="form-floating">
                <input 
                    name="email"
                    id="email" 
                    type="email" 
                    className="form-control" 
                    placeholder="user@user.com" 
                    onChange={e => setEmail(e.target.value)} 
                    required />
                <label htmlFor="email">Email</label>
                </div>

                <div className="text-start my-3">
                </div>

                <button className="btn btn-dark w-100 py-2" type="submit">Receive Password Reset</button> 
            </form> 
        </Layout>
    )
}
