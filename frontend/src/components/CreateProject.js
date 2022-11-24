import React, { useContext, useEffect, useRef, useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { addParams, authRequest } from "../helpers/authRequest";
import { updateProject } from "../apiCalls/service";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
  const nameRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const navigate = useNavigate();

  const { dispatch, projects, user } = useContext(AuthContext);
  //const project = projects.filter(p => p._id);
  let { id } = useParams();
  const activeProject = projects.filter((p) => p._id === id)[0];
  const [name, setName] = useState(activeProject?.name);
  const [startDate, setStartDate] = useState(activeProject?.startDate);
  const [endDate, setEndDate] = useState(activeProject?.endDate);
  const [isFinished, setIsFinished] = useState(activeProject?.isFinished);
  const handleClick = (e) => {
    e.preventDefault();
  };

  const handleClickEdit = (e) => {
    e.preventDefault();
    const updatedProject = {
      email: user.email,
      projectData: {
        projectId: id,
        name: name,
        startDate: startDate,
        endDate: endDate,
        isFinished: isFinished,
      },
    };

    updateProject(updatedProject, authRequest(user)).then((response) => {
      navigate("/");
    });
  };

  const handleChange = (e) => {
    setIsFinished(!isFinished);
  };

  return (
    <Row>
      <Col></Col>
      <Col>
        {activeProject && <h3>Update project here!</h3>}
        {!activeProject && <h3>Create a new project here!</h3>}
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicStartDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="text"
              placeholder="Start Date (DD-MM-YYYY)"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEndDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="text"
              placeholder="End Date (DD-MM-YYYY)"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Is Finished?"
              checked={isFinished}
              onChange={handleChange}
              disabled={isFinished}
            />
          </Form.Group>
          {activeProject && (
            <Button variant="primary" type="submit" onClick={handleClickEdit}>
              Update
            </Button>
          )}
          {!activeProject && (
            <Button variant="primary" type="submit" onClick={handleClick}>
              Create New
            </Button>
          )}
        </Form>
      </Col>
      <Col></Col>
    </Row>
  );
};

export default CreateProject;
