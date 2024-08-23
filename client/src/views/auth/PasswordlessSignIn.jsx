import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '@/context/AuthContext.jsx';


export default function PasswordlessSignIn() {
    const { PasswordlessSignIn } = useContext(AuthContext);
    const params = useParams();
    const username = params.username;
    const token = params.token;

    PasswordlessSignIn(username, token);

    return (
        <div>Please wait ...</div>
    )
}
