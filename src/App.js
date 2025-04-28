import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import EmployeeList from "./components/Employee/EmployeeList";
import EmployeeForm from "./pages/Employeeform";
import ProjectList from "./components/Project/ProjectList";
import ProjectForm from "./pages/ProjectForm";
import TaskList from "./components/Task/TaskList";
import TaskForm from "./components/Task/TaskForm";
import { Container } from "react-bootstrap";
import Header from "./components/common/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setTaskStatus } from "./redux/slices/taskSlice";
function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const tasksFromStorage = JSON.parse(localStorage.getItem("tasks")) || [];
  //   dispatch(setTasks(tasksFromStorage)); // Set tasks in Redux store
  // }, [dispatch]);

  return (
    <Router>
      <Header />
      <Container className="py-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/new" element={<EmployeeForm />} />
          <Route path="/employees/edit/:id" element={<EmployeeForm />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/new" element={<ProjectForm />} />
          <Route path="/projects/edit/:id" element={<ProjectForm />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/new" element={<TaskForm />} />
          <Route path="/tasks/edit/:id" element={<TaskForm />} />
        </Routes>
      </Container>

      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
