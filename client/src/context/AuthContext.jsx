import { createContext, useState, useEffect } from 'react'; 
import swal from 'sweetalert2'; 
import axios from 'axios'; 
import { jwtDecode } from 'jwt-decode'; 
import { useNavigate } from 'react-router-dom'; 
import { route } from '@/routes'; 
import Constants from '@/utils/Constants.jsx'; 

const AuthContext = createContext(); 

export default AuthContext; 


export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => 
        localStorage?.getItem('tashaBestDecor_authTokens') 
            ? JSON.parse(localStorage?.getItem('tashaBestDecor_authTokens')) 
            : null); 

    const [user, setUser] = useState(() => 
        localStorage?.getItem('tashaBestDecor_authTokens') 
            ? jwtDecode(localStorage?.getItem('tashaBestDecor_authTokens')) 
            : null); 

    const [loading, setLoading] = useState(true); 

    const navigate = useNavigate(); 


    /** Routes */ 

    const signUp = async (username, email, firstName, otherNames, lastName, enterpriseName, password, account_type) => {
        await axios.post(`${ Constants?.serverURL }/api/v1/auth/sign-up`, { username, email, first_name: firstName, other_names: otherNames, last_name: lastName, enterprise_name: enterpriseName, password, account_type })
            .then((response) => { 
                // console.log(response); 
                navigate(route('sign-in')); 
                swal.fire({
                    text: 'Registration successful. An email with a verification link has been sent to you.', 
                    color: '#823c03', 
                    width: 325, 
                    position: 'top', 
                    showConfirmButton: false
                })
            })
            .catch(error => { 
                // console.log(error); 
                swal.fire({
                    text: `${error}`, 
                    color: '#900000', 
                    width: 325, 
                    position: 'top', 
                    showConfirmButton: false
                })
            });
    } 

    const verifyEmail = async (username, token) => {
        await axios.post(`${ Constants.serverURL }/api/v1/auth/verify-email/${ username }/${ token }`)
            .then(response => {
                // console.log(response); 
                setAuthTokens(response?.data); 
                setUser(jwtDecode(response?.data?.access)); 
                localStorage?.setItem('tashaBestDecor_authTokens', JSON?.stringify(response?.data)); 
                navigate(route('home.index')); 
                swal.fire({
                    text: 'Email verified!', 
                    color: '#823c03', 
                    width: 325, 
                    position: 'top', 
                    showConfirmButton: false
                })
            })
            .catch(error => { 
                // console.log(error); 
                navigate(route('sign-in')); 
                if (error?.response?.status == '400') {
                    swal.fire({
                        text: `${error?.response?.data}`, 
                        color: '#900000', 
                        width: 325, 
                        position: 'top', 
                        showConfirmButton: false
                    })
                } else {
                    swal.fire({
                        text: `${error?.response?.status}: Something went wrong!`, 
                        color: '#900000', 
                        width: 325, 
                        position: 'top', 
                        showConfirmButton: false
                    })
                }
            });
    }

    const signIn = async (email_username, password) => {
        await axios.post(`${ Constants?.serverURL }/api/v1/auth/sign-in`, { email_username, password })
            .then(response => {
                // console.log(response); 
                setAuthTokens(response?.data); 
                setUser(jwtDecode(response?.data?.access)); 
                localStorage?.setItem('tashaBestDecor_authTokens', JSON?.stringify(response?.data)); 
                navigate(route('home.index')); 
            })
            .catch(error => { 
                // console.log(error);
                if (error?.response?.status == '401') {
                    swal.fire({
                        text: `${error?.response?.data?.message}`, 
                        color: '#900000', 
                        width: 325, 
                        position: 'top', 
                        showConfirmButton: false
                    })
                } else {
                    swal.fire({
                        text: `${error?.response?.status}: Something went wrong!`, 
                        color: '#900000', 
                        width: 325, 
                        position: 'top', 
                        showConfirmButton: false
                    })
                }
            });
    } 

    const passwordlessSignInRequest = async (username) => {
        await axios.post(`${ Constants.serverURL }/api/v1/auth/passwordless-signin-request`, { username })
            .then((response) => { 
                console.log(response); 
                swal.fire({
                    text: `${response?.data?.success}`,
                    color: "#820303",
                    width: 350,
                    position: 'top',
                    showConfirmButton: false,
                });
            })
            .catch(error => {
                console.log(error);
                if (error?.response?.status == '401') {
                    swal.fire({
                        text: `${error?.response?.data?.message}`, 
                        color: '#900000', 
                        width: 325, 
                        position: 'top', 
                        showConfirmButton: false
                    })
                } else {
                    swal.fire({
                        text: `${error?.response?.status}: Something went wrong!`, 
                        color: '#900000', 
                        width: 325, 
                        position: 'top', 
                        showConfirmButton: false
                    })
                }
            })
    } 

    const passwordlessSignIn = async (username, token) => {
        await axios.post(`${ Constants.serverURL }/api/v1/auth/passwordless-signin/${ username }/${ token }`)
            .then(response => {
                // console.log(response); 
                setAuthTokens(response?.data); 
                setUser(jwtDecode(response?.data?.access)); 
                localStorage?.setItem('tashaBestDecor_authTokens', JSON?.stringify(response?.data)); 
                navigate(route('home.index')); 
            })
            .catch(error => { 
                // console.log(error); 
                navigate(route('sign-in')); 
                if (error?.response?.status == '400') {
                    swal.fire({
                        text: `${error?.response?.data}`, 
                        color: '#900000', 
                        width: 325, 
                        position: 'top', 
                        showConfirmButton: false
                    })
                } else {
                    swal.fire({
                        text: `${error?.response?.status}: Something went wrong!`, 
                        color: '#900000', 
                        width: 325, 
                        position: 'top', 
                        showConfirmButton: false
                    })
                }
            });
    }

    const signOut = async () => {
        setAuthTokens(null); 
        setUser(null); 
        localStorage?.removeItem('tashaBestDecor_authTokens'); 
        await axios.post(`${ Constants?.serverURL }/api/v1/auth/sign-out`)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                navigate(route('sign-in'));
            })
    } 

    const resetPasswordRequest = async (email) => {
        await axios.post(`${ Constants?.serverURL }/api/v1/auth/password-reset`, { email })
            .then(response => {
                console.log(response); 
                swal.fire({
                    text: 'Email notification with reset link was sent to your email.', 
                    color: '#823c03', 
                    width: 325, 
                    position: 'top', 
                    showConfirmButton: false
                })
            })
            .catch(error => {
                console.log(error); 
                swal.fire({
                    text: `${error?.response?.status}: Something went wrong!`, 
                    color: '#900000', 
                    width: 325, 
                    position: 'top', 
                    showConfirmButton: false
                });
            })
    } 

    const resetPassword = async (username, token, password) => {
        await axios.post(`${ Constants?.serverURL }/api/v1/auth/password-reset/${ username }/${ token }`, { password })
            .then(response => {
                console.log(response); 
                navigate(route('sign-in')); 
                swal.fire({
                    text: `${response?.data?.success}`, 
                    color: '#823c03', 
                    width: 325, 
                    position: 'top', 
                    showConfirmButton: false
                })
            })
            .catch(error => {
                console.log(error); 
                swal.fire({
                    text: `${error?.response?.status}: Something went wrong!`, 
                    color: '#900000', 
                    width: 325, 
                    position: 'top', 
                    showConfirmButton: false
                });
            })
    }; 


    let contextData = {
        user, 
        setUser, 
        authTokens, 
        setAuthTokens, 
        signUp, 
        verifyEmail, 
        signIn, 
        passwordlessSignInRequest, 
        passwordlessSignIn, 
        signOut, 
        resetPasswordRequest, 
        resetPassword
    } 

    useEffect(() => {
        if (authTokens?.authorization) setUser(jwtDecode(authTokens?.authorization?.token)); 
        setLoading(false); 
    }, [authTokens, loading]); 


    return (
        <AuthContext.Provider value={ contextData }>
            { loading ? null : children }
        </AuthContext.Provider>
    )
}