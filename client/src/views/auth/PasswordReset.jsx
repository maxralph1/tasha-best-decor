import { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { route } from '@/routes'; 
import AuthContext from '@/context/AuthContext.jsx'; 
import swal from 'sweetalert2'; 
import Layout from '@/components/public/Layout.jsx'; 


export default function PasswordReset() { 
    const [password, setPassword] = useState(''); 
    const [password2, setPassword2] = useState(''); 

    const params = useParams(); 
    const { username, token } = params; 

    let { resetPassword } = useContext(AuthContext); 

    const handleSubmit = async e => {
        e.preventDefault(); 

        if (password != password2) {
            swal.fire({
            text: 'Given passwords do not match', 
            color: "#820303",
            width: 300,
            position: 'top',
            showConfirmButton: false,
            });
        } else if (password == password2) {
            resetPassword(username, token, password); 
        }; 
    }; 

    return (
        <Layout> 
            <form onSubmit={ handleSubmit }>
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

                <div className="text-start my-3">
                </div>

                <button className="btn btn-dark w-100 py-2" type="submit">Reset Password</button> 
            </form>
        </Layout>
    )
}
