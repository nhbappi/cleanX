import React, { useState } from 'react';
import { Button, Col, Container, Form, Row, ToastContainer } from "react-bootstrap";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from "react-firebase-hooks/auth";

import Loading from './Loading';
import GoogleLogin from './GoogleLogin';
import auth from '../../Firebase/Firebase.init';

const Register = () => {
    const [name, setName] = useState("");
    const [agree, setAgree] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";
  let errorElement;
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, {sendEmailVerification: true});
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    

 

  const navigateLogin = () => {
    navigate("/login");
  };

  if(user){
    navigate(from, {replace: true});
}
  if (error) {
    errorElement = <p className="text-danger">Error: {error?.message}</p>;
  }

  if(loading || updating){
    return<Loading></Loading>
}


  const handleRegister = async (event) => {
    event.preventDefault();
    
   
       await createUserWithEmailAndPassword(email, password);
       await updateProfile({ displayName: name});
          alert('Updated profile');
          
    
  };

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
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3 w-75" controlId="formBasicName">
              <Form.Control  onChange={(e) => setName(e.target.value)} type="name" placeholder="Your Name" required />
            </Form.Group>
            <Form.Group className="mb-3 w-75" controlId="formBasicEmail">
              <Form.Control  onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" required />
            </Form.Group>

            <Form.Group className="mb-3 w-75" controlId="formBasicPassword">
              <Form.Control onChange={(e) => setPassword(e.target.value)}  type="password" placeholder="Password" required />
            </Form.Group>

            <Form.Group  className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onClick={() => setAgree(!agree)} type="checkbox" className={` ${agree ? 'text-success' : 'text-danger'} text-start`} label="Accept CleanX terms and Condition" />
           
          </Form.Group>


            <Button disabled={!agree} variant="primary w-75 d-block mb-2" type="submit" onClick={() => createUserWithEmailAndPassword(email, password)}>
            Register
            </Button>
          </Form>
          {errorElement}
          <p className="text-start"> Already Registered?{" "} <Link to ="/login" className="text-primary pe-auto text-decoration-none" onClick={navigateLogin}>Please Login</Link></p>
         <GoogleLogin></GoogleLogin>
        </Col>
      </Row>
      <ToastContainer></ToastContainer>
    </Container>
    );
};

export default Register;