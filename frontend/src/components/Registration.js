import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { createUser } from "../apiCalls/service";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const { error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    const user = {
      email: email,
      name: name,
      password: password,
    };
    if (name !== "" && email !== "" && password !== "")
      createUser(user)
        .then((response) => {
          if (response.status !== "error") navigate("/");
          dispatch({ type: "REGISTRATION_FAILURE", payload: response.message });
        })
        .catch((error) => {
          dispatch({ type: "REGISTRATION_FAILURE", payload: error });
        });
  };

  const handleClickLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  useEffect(() => {
    if (error) alert(error);
  }, [error]);

  return (
    <Row>
      <Col></Col>
      <Col>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              onChange={(event) => setName(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleClick}>
            Submit
          </Button>
          &nbsp;
          <Button variant="primary" type="submit" onClick={handleClickLogin}>
            Existing user? Click here!
          </Button>
        </Form>
      </Col>
      <Col></Col>
    </Row>
  );
};

export default Registration;
