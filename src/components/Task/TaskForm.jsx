import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import {
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTask, updateTask } from "../../redux/slices/taskSlice";
import { useNavigate, useParams } from "react-router-dom";

const schema = yup.object().shape({
  title: yup.string().required("Task Title is required"),
  description: yup.string().required("Description is required"),
  eta: yup.date().required("ETA is required"),
  referenceImage: yup
    .string()
    .url("Enter a valid URL")
    .required("Reference Image URL is required"),
  projectTitle: yup.string().required("Project is required"),
});

export default function TaskForm({ defaultValues, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const employees = useSelector((state) => state.employees);
  const projects = useSelector((state) => state.projects.projects);

  const [selectedEmployees, setSelectedEmployees] = useState(
    defaultValues?.assignedEmployees || []
  );

  const statuses = [
    "Need to Do",
    "In Progress",
    "Need for Test",
    "Completed",
    "Re-open",
  ];

  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
      eta: defaultValues?.eta
        ? new Date(defaultValues.eta).toISOString().split("T")[0]
        : "",
      status: defaultValues?.status || "Need to Do",
      referenceImage: defaultValues?.referenceImage || "",
      assignedEmployees: defaultValues?.assignedEmployees || [],
      projectTitle: defaultValues?.projectTitle || "",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      setValue("title", defaultValues.title);
      setValue("description", defaultValues.description);
      setValue(
        "eta",
        defaultValues.eta
          ? new Date(defaultValues.eta).toISOString().split("T")[0]
          : ""
      );
    }
  }, [defaultValues, setValue]);

  const onSubmit = (data) => {
    const finalTask = {
      ...data,
      assignedEmployees: selectedEmployees,
      referenceImage: data.referenceImage || "https://via.placeholder.com/150",
      eta: new Date(data.eta).toISOString().split("T")[0],
    };

    console.log("[DEBUG] Final Task Prepared:", finalTask);

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (defaultValues) {
      const updatedTask = { ...defaultValues, ...finalTask };
      tasks = tasks.map((task) =>
        task.id === defaultValues.id ? updatedTask : task
      );
      dispatch(updateTask(updatedTask));
      toast.success("Task updated successfully!");
    } else {
      const newTask = { id: Date.now(), ...finalTask };
      tasks.push(newTask);

      dispatch(addTask(newTask));

      localStorage.setItem("tasks", JSON.stringify(tasks));

      toast.success("Task added successfully!");
    }

    if (onClose) {
      console.log("[DEBUG] Closing Modal");
      onClose();
    } else {
      console.log("[DEBUG] Navigating to /tasks");
      navigate("/tasks");
    }
  };

  const availableEmployees = employees.filter(
    (emp) => !defaultValues?.assignedEmployees?.includes(emp.email)
  );

  return (
    <Container className="my-4">
      <Card className="p-4 shadow">
        <Typography variant="h5" gutterBottom>
          {defaultValues ? "Edit Task" : "Add New Task"}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-3">
            <Col md={6}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Task Title"
                    fullWidth
                    variant="outlined"
                  />
                )}
              />
            </Col>
            <Col md={6}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    fullWidth
                    variant="outlined"
                  />
                )}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Controller
                name="eta"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="date"
                    label="ETA"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                  />
                )}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Controller
                name="projectTitle"
                control={control}
                defaultValue={defaultValues?.projectTitle || ""}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Project</InputLabel>
                    <Select {...field} label="Project">
                      {projects.map((project) => (
                        <MenuItem key={project.id} value={project.title}>
                          {project.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Controller
                name="assignedEmployees"
                control={control}
                defaultValue={selectedEmployees}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Assign Employees</InputLabel>
                    <Select
                      multiple
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        setSelectedEmployees(e.target.value);
                      }}
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {availableEmployees.map((emp) => (
                        <MenuItem key={emp.id} value={emp.email}>
                          {emp.name} ({emp.email})
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select {...field} label="Status">
                      {statuses.map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Controller
                name="referenceImage"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Reference Image URL"
                    fullWidth
                    variant="outlined"
                  />
                )}
              />
            </Col>
          </Row>

          <Button type="submit" variant="contained" color="primary">
            {defaultValues ? "Update Task" : "Create Task"}
          </Button>
        </form>
      </Card>
    </Container>
  );
}
