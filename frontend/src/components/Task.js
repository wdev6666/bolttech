import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import { deleteTask, updateTask } from "../apiCalls/service";
import { AuthContext } from "../context/AuthContext";
import { authRequest } from "../helpers/authRequest";
import { Trash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const Task = ({ task }) => {
  const { user } = useContext(AuthContext);
  const [isFinished, setIsFinished] = useState(task.isFinished);
  const [displayTrash, setDisplayTrash] = useState("none");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const updatedTask = {
      id: task._id,
      isFinished: !isFinished,
    };
    updateTask(updatedTask, authRequest(user));
    navigate("/");
    window.location.reload();
  };

  const handleDelete = () => {
    deleteTask(task._id, authRequest(user));
    navigate("/");
    window.location.reload();
  };

  const handleMouseHover = () => {
    setDisplayTrash("block");
  };

  const handleMouseOut = () => {
    setDisplayTrash("none");
  };

  return (
    <div
      className="task"
      onMouseOver={handleMouseHover}
      onMouseOut={handleMouseOut}
    >
      <Form.Check
        type="checkbox"
        onChange={handleChange}
        checked={isFinished}
        disabled={isFinished}
        label={task.description}
      />
      {!task.isFinished && (
        <div>
          <OverlayTrigger
            key="right"
            placement="right"
            overlay={
              <Tooltip id={`tooltip-right`}>
                {task.endDate && task.endDate !== "undefined" && (
                  <strong>Finishing on, {task?.endDate}</strong>
                )}
              </Tooltip>
            }
          >
            <Trash
              style={{
                display: displayTrash,
                margin: "5px 0px 0px 4px",
                cursor: "pointer",
              }}
              onClick={handleDelete}
            />
          </OverlayTrigger>
        </div>
      )}
    </div>
  );
};

export default Task;
