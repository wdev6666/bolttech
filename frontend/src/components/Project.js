import React, { useContext, useEffect, useState } from "react";
import { Pencil, Trash } from "react-bootstrap-icons";
import { createTask, deleteProject, getAllTasks } from "../apiCalls/service";
import { AuthContext } from "../context/AuthContext";
import { addParams, authRequest } from "../helpers/authRequest";
import Task from "./Task";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Project = ({ project }) => {
  const { user, dispatch } = useContext(AuthContext);
  const [ongoingTasks, setOngoingTasks] = useState([]);
  const [finishedTasks, setFinishedTasks] = useState([]);
  const navigate = useNavigate();
  const [task, setTask] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    if (!user || user === undefined || user === null) dispatch("/login");

    const taskListing = () => {
      const params = { projectId: project._id };
      getAllTasks(project._id, addParams(authRequest(user), params)).then(
        (response) => {
          setFinishedTasks(response.filter((task) => task.isFinished));
          setOngoingTasks(response.filter((task) => !task.isFinished));
        }
      );
    };

    if (user && user !== undefined && user !== null) {
      taskListing();
    }
  }, [user]);

  const handleEdit = (e) => {
    e.preventDefault();
    navigate("/project/" + project._id);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteProject(project._id, authRequest(user));
    window.location.reload();
    navigate("/");
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const taskData = {
      email: user.email,
      taskData: {
        projectId: project._id,
        description: task,
        startDate: startDate,
        endDate: endDate,
      },
    };
    if (task !== "" && task !== null) {
      createTask(taskData, authRequest(user));
      window.location.reload();
    }
  };

  return (
    <Card>
      <Card.Header>
        {project.name}
        <span style={{ float: "right", cursor: "pointer" }}>
          <Pencil onClick={handleEdit} /> &nbsp;
          <Trash onClick={handleDelete} />
        </span>
      </Card.Header>
      <Card.Body>
        <h5>To Do</h5>
        {ongoingTasks.length === 0 && "No tasks"}
        {ongoingTasks &&
          ongoingTasks.map((task) => <Task task={task} key={task._id} />)}
        <hr />
        <h5>Done</h5>
        {finishedTasks.length === 0 && "No tasks"}
        {finishedTasks &&
          finishedTasks.map((task) => <Task task={task} key={task._id} />)}
      </Card.Body>
      <hr />
      <Form style={{ margin: "0px 10px 0px 10px", textAlign: "center" }}>
        <Row className="mb-1" style={{ align: "center" }}>
          <Col>
            <Form.Control
              type="text"
              placeholder="Task"
              onChange={(event) => setTask(event.target.value)}
            />
          </Col>
        </Row>
        <Row className="mb-1">
          <Col>
            <Form.Control
              type="text"
              placeholder="Start(YYYY-MM-DD)"
              onChange={(event) => setStartDate(event.target.value)}
            />
          </Col>
        </Row>
        <Row className="mb-1">
          <Col>
            <Form.Control
              type="text"
              placeholder="End(YYYY-MM-DD)"
              onChange={(event) => setEndDate(event.target.value)}
            />
            <Button
              className="mt-1"
              as={Col}
              variant="primary"
              type="submit"
              onClick={handleAddTask}
            >
              Add
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default Project;
