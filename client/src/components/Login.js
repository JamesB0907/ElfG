import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "./managers/UserManager";
import { getUserStatus } from "./managers/UserManager";
import './Login.css'; 

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    login({ email })
      .then((user) => {
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="login-container">
      <div className="logo">ElfG</div>
      <div className="slogan">Start Your Journey</div>
      <div className="login-box">
        <Form onSubmit={loginSubmit}>
          <FormGroup className="form-group">
            <Label for="email">Email</Label>
            <Input id="email" type="text" onChange={(e) => setEmail(e.target.value)} />
          </FormGroup>
          <FormGroup className="form-group">
            <Label for="password">Password</Label>
            <Input id="password" type="password" />
          </FormGroup>
          <FormGroup className="form-group">
            <Button className="login-button">Login</Button>
          </FormGroup>
          <em>
             <Link className="register-link" to="/register">First time adventuring?</Link>
          </em>
        </Form>
      </div>
    </div>
  );
}
