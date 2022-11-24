import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";
import { AuthContext } from "./context/AuthContext";
import Home from "./components/Home";
import CreateProject from "./components/CreateProject";
import Container from "react-bootstrap/Container";
import Topbar from "./components/Topbar";
import Project from "./components/Project";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Container>
        <Topbar />
        <Routes>
          <Route path="/" element={user !== null ? <Home /> : <Login />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/registration"
            element={user ? <Navigate to="/" /> : <Registration />}
          />
          <Route path="/project/:id" element={<CreateProject />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
