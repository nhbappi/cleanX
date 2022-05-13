import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../Firebase/Firebase.init';
import './GoogleLogin.css'
import Loading from './Loading';

const GoogleLogin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
    let errorElement;

    if(loading){
        return<Loading></Loading>
    }
    if (error) {
        errorElement =
        
            <p className='text-danger'>Error: {error?.message}</p>
         
        
      }

      if(user){
        navigate(from, {replace: true});
    }
    return (
        <div>
            <div className='d-flex align-items-center'>
                <div style={{height: "1px"}}className='bg-primary line'></div>
                <p className='mt-2 px-2'>or</p>
                <div style={{height: "1px"}}className='bg-primary line'></div>
            </div>
             {/* {errorElement} */}
           <div className=''>
           <button onClick={() => signInWithGoogle()} className='btn btn-light w-75 block me-auto d-block text-start'>
                <img style={{width: '25px'}} className='img-fluid' src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="" />
                <span className='px-2'>Google Sign In</span></button>
           </div>
        </div>
    );
};

export default GoogleLogin;