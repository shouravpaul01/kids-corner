import React, { useContext, useState } from 'react';
import { Link,  useLocation,  useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../providers/AuthProvider';
import useTitle from '../hooks/useTitle';

const Login = () => {
    useTitle('Login')
    const { user, logIn, googleLogin } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    const from = location.state?.from?.pathname || '/'
    // console.log(from.split('/')[1]);
    // console.log(error);
    if (error==null) {
        if (from.split('/')[1] =='details') {
            toast.success('You have to log in first to view details')
            
        }
    }
   
    const handleLogin = e => {
        e.preventDefault();
        setError('');
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        logIn(email, password)
            .then((userCredential) => {
                // Signed in 
                const result = userCredential.user;
                form.reset();
                navigate(from, { replace: true })
                
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage)
                // console.log(errorMessage);
            });
    };
    const handleGoogleAuth = () => {
        googleLogin()
            .then((result) => {
                const user = result.user;
                   navigate(from, { replace: true })
                   
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <div className='flex justify-center my-20'>
            <div className="card w-96 bg-base-100 shadow-xl ">
                <p className='text-2xl font-bold text-center'>Login</p>
                {
                    error && <p className='text-red-700 text-center'>{error}</p>
                }
                <div className="card-body  text-center pt-5">
                <form onSubmit={handleLogin} className='space-y-3'>
                    <input type="email" name='email' placeholder="Enter your email" className="input input-bordered input-primary w-full max-w-xs" required/>
                    <input type="password" name='password' placeholder="Password" className="input input-bordered input-primary w-full max-w-xs" required/>
                    <button className="btn btn-primary w-full">Login</button>
                    <div className="card-actions">
                        <Link to='/register'>Create new account?</Link>
                    </div>
                </form>
                    <button onClick={handleGoogleAuth} className="btn bg-gradient-to-r from-indigo-500"> <span className='font-extrabold text-xl me-2'>G</span> Google</button>
                </div>
               
            </div>
        </div>

    );
};

export default Login;