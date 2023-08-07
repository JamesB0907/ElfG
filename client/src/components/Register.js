import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { register } from "../Managers/UserProfileManager";

export default function Register({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userTypeId, setUserTypeId] = useState(1); // Default user type (Player)
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const userProfile = {
        username,
        email,
        userTypeId,
        isActive: true
      };
      register(userProfile, password)
        .then(() => {
          setIsLoggedIn(true);
          navigate("/");
        });
    }
  };

  return (
    <Form onSubmit={registerClick}>
      <fieldset>
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input id="username" type="text" onChange={(e) => setUsername(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="text" onChange={(e) => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup tag="fieldset">
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
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" onChange={(e) => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Button>Register</Button>
        </FormGroup>
      </fieldset>
    </Form>
  );
}
