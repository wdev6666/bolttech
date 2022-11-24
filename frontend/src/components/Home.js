import { useContext, useEffect, useState } from "react";
import { createProject, getAllProjects } from "../apiCalls/service";
import { AuthContext } from "../context/AuthContext";
import { authRequest } from "../helpers/authRequest";
import Project from "./Project";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Home() {
  const { user, dispatch } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleCreateProject = (e) => {
    e.preventDefault();
    const projectData = {
      name: name,
      startDate: startDate,
      endDate: endDate,
    };
    if (name !== "" && startDate !== "" && endDate !== "") {
      createProject(
        { email: user.email, projectData: projectData },
        authRequest(user)
      );
      window.location.reload();
    }
  };

  useEffect(() => {
    if (!user || user === undefined || user === null) dispatch("/login");
    const projectListing = () => {
      getAllProjects(authRequest(user)).then((response) => {
        setProjects(response);
        dispatch({ type: "PROJECT_LISTING", payload: { user, response } });
      });
    };

    if (user && user !== undefined && user !== null) {
      projectListing();
    }
  }, [user]);

  return (
    <>
      {projects.length === 0 && <h1>No projects</h1>}
      <Row>
        {projects &&
          projects.map((project) => (
            <Col key={project._id} xs={4}>
              <Project project={project} key={project._id} />
            </Col>
          ))}
        <Col
          xs={4}
          style={{
            border: "1px solid grey",
            borderRadius: "5px",
            backgroundColor: "#f0f0f0",
          }}
        >
          <h4>Create a new project</h4>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Project name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                onChange={(event) => setName(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter start date (YYYY-MM-DD)"
                onChange={(event) => setStartDate(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEndDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter end date (YYYY-MM-DD)"
                onChange={(event) => setEndDate(event.target.value)}
              />
            </Form.Group>
            <Button
              className="col-md-12"
              variant="primary"
              type="submit"
              onClick={handleCreateProject}
            >
              Create Project
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}
