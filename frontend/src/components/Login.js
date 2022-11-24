import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { login } from "../apiCalls/service";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    if (email !== "" && password !== "")
      login(user)
        .then((response) => {
          if (response.status !== "error") {
            navigate("/");
            localStorage.setItem("user", JSON.stringify(response.loggedInUser));
            dispatch({ type: "LOGIN_SUCCESS", payload: response.loggedInUser });
          } else {
            dispatch({ type: "LOGIN_FAILURE", payload: response.message });
          }
        })
        .catch((error) => {
          dispatch({ type: "LOGIN_FAILURE", payload: error });
        });
  };

  const handleClickRegister = (e) => {
    e.preventDefault();
    navigate("/registration");
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
          <Button variant="primary" type="submit" onClick={handleClickRegister}>
            New user? Click here!
          </Button>
        </Form>
      </Col>
      <Col></Col>
    </Row>
  );
};

export default Login;
