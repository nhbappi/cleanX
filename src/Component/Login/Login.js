import React, { useRef } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

import './Login.css'
import { toast, ToastContainer } from "react-toastify";
import Loading from "./Loading";
import auth from "../../Firebase/Firebase.init";
import GoogleLogin from "./GoogleLogin";
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

const Login = () => {
  const emailRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate();
    const location = useLocation();

    let from = location.state?.from?.pathname || "/";
    let errorElement;
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

      const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
      
      if(loading || sending){
        return<Loading></Loading>
    }
     
    if(user){
        navigate(from, {replace: true});
    }

    if (error) {
        errorElement =
            <p className='text-danger'>Error: {error?.message}</p>
          
        
      }

      

    const handleSubmit = event =>{
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        signInWithEmailAndPassword(email, password);
    }
    const navigateRegister = event =>{
         navigate('/register')
    }

    const resetPassword = async() =>{
        
            const email = emailRef.current.value;
            if(email){
                await sendPasswordResetEmail(email);
            toast('Sent email');
    
            }
            else{
                toast('please enter your email address')
            }
}
  return (
    
    <Container>
        
      <Row >
        <Col>
          <img className="login-image"
            src="https://static.vecteezy.com/system/resources/previews/003/578/878/original/cleaning-service-concept-cheerful-cartoon-character-vector.jpg"
            alt=""
          />
        </Col>
        <Col className="login-form">
        <h1 className="text-primary text-start mt-2">Welcome to CleanX</h1>
        <h3 className="text-primary text-start mt-5">Please Login...</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 w-75" controlId="formBasicEmail">
              <Form.Control  ref= {emailRef} type="email" placeholder="Enter email" required />
            </Form.Group>

            <Form.Group className="mb-3 w-75" controlId="formBasicPassword">
              <Form.Control ref= {passwordRef}  type="password" placeholder="Password" required />
            </Form.Group>
            <Button variant="primary w-75 d-block mb-2" type="submit">
              Login
            </Button>
          </Form>

          <p className="text-start">New to CleanX? <Link to ="/register" className="text-primary pe-auto text-decoration-none" onClick={navigateRegister}>Please Register</Link></p>
      <p className="text-start">Forget password? <button className="btn btn-link text-primary pe-auto text-decoration-none" onClick={resetPassword} >Reset Password</button></p>
      <GoogleLogin></GoogleLogin>
        </Col>
      </Row>
      <ToastContainer></ToastContainer>
    </Container>


  );
};

export default Login;
