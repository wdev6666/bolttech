import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Topbar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    navigate("/login");
  };

  //  useEffect(() => {
  //    if (!user || user === undefined || user === null) dispatch("/login");
  //  }, [user]);

  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="/">Bolttech Test</Navbar.Brand>
        <Navbar.Toggle />

        <Navbar.Collapse className="justify-content-end">
          {user && (
            <Navbar.Text>
              Signed in as: {user?.name} &nbsp; | &nbsp;
            </Navbar.Text>
          )}
          {user && (
            <Nav.Link href="#action1" onClick={handleClick}>
              Logout
            </Nav.Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Topbar;
