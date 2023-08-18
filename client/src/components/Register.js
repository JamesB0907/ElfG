import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { register } from "./managers/UserManager";
import './Register.css'; // Import the custom CSS file

export default function Register({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userTypeId, setUserTypeId] = useState(1);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerClick = (e) => {
    e.preventDefault();
    const userProfile = {
      username,
      email,
      userTypeId
    };
    register(userProfile, password)
      .then(() => {
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        console.error("Registration failed:", error);
      });
  };

  return (
    <div className="register-container">
      <div className="logo">ElfG</div>
      <div className="slogan">Start Your Journey</div>
      <div className="register-box">
        <Form onSubmit={registerClick}>
          <FormGroup className="form-group">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="form-group">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="form-group" tag="fieldset">
            <legend>User Type</legend>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="userType"
                  value={1}
                  checked={userTypeId === 1}
                  onChange={(e) => setUserTypeId(Number(e.target.value))}
                />{" "}
                Player
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="userType"
                  value={2}
                  checked={userTypeId === 2}
                  onChange={(e) => setUserTypeId(Number(e.target.value))}
                />{" "}
                Game Master
              </Label>
            </FormGroup>
          </FormGroup>
          <FormGroup className="form-group">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="form-group">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="form-group">
            <Button className="register-button">Register</Button>
            <Link className='nav-to-login' to='/login'>Back to Login</Link>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
}
