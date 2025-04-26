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
import { addProject, updateProject } from "../redux/slices/projectSlice";
import { useNavigate, useParams } from "react-router-dom";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  startDate: yup.date().required("Start Date is required"),
  endDate: yup.date().required("End Date is required"),
});

export default function ProjectForm({ defaultValues, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const employees = useSelector((state) => state.employees);

  const [selectedEmployees, setSelectedEmployees] = useState(
    defaultValues?.assignedEmployees || []
  );
  const [logoUrl, setLogoUrl] = useState(defaultValues?.logo || "");

  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues
      ? {
          ...defaultValues,
          startDate: defaultValues.startDate
            ? new Date(defaultValues.startDate).toISOString().split("T")[0]
            : "",
          endDate: defaultValues.endDate
            ? new Date(defaultValues.endDate).toISOString().split("T")[0]
            : "",
        }
      : {
          title: "",
          description: "",
          startDate: "",
          endDate: "",
        },
  });

  useEffect(() => {
    if (defaultValues) {
      setValue("title", defaultValues.title);
      setValue("description", defaultValues.description);
      setValue(
        "startDate",
        defaultValues.startDate
          ? new Date(defaultValues.startDate).toISOString().split("T")[0]
          : ""
      );
      setValue(
        "endDate",
        defaultValues.endDate
          ? new Date(defaultValues.endDate).toISOString().split("T")[0]
          : ""
      );
    }
  }, [defaultValues, setValue]);

  const onSubmit = (data) => {
    const finalProject = {
      ...data,
      assignedEmployees: selectedEmployees,
      logo: logoUrl || "https://via.placeholder.com/150",
      startDate: new Date(data.startDate).toISOString().split("T")[0],
      endDate: new Date(data.endDate).toISOString().split("T")[0],
    };

    let projects = JSON.parse(localStorage.getItem("projects")) || [];

    if (defaultValues) {
      const updatedProject = { ...defaultValues, ...finalProject };
      projects = projects.map((proj) =>
        proj.id === defaultValues.id ? updatedProject : proj
      );
      dispatch(updateProject(updatedProject));
      toast.success("Project updated successfully!");
    } else {
      const newProject = { id: Date.now(), ...finalProject };
      projects.push(newProject);
      dispatch(addProject(newProject));
      toast.success("Project added successfully!");
    }

    localStorage.setItem("projects", JSON.stringify(projects));
    onClose ? onClose() : navigate("/projects");
  };

  const availableEmployees = employees.filter(
    (emp) => !defaultValues?.assignedEmployees?.includes(emp.email)
  );

  return (
    <Container className="my-4">
      <Card className="p-4 shadow">
        <Typography variant="h5" gutterBottom>
          {defaultValues ? "Edit Project" : "Add New Project"}
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
                    label="Title"
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
                name="startDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="date"
                    label="Start Date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                  />
                )}
              />
            </Col>
            <Col md={6}>
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="date"
                    label="End Date"
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
              <FormControl fullWidth>
                <InputLabel>Assign Employees</InputLabel>
                <Select
                  multiple
                  value={selectedEmployees}
                  onChange={(e) => setSelectedEmployees(e.target.value)}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {availableEmployees.map((emp) => (
                    <MenuItem key={emp.id} value={emp.email}>
                      {emp.name} ({emp.email})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <TextField
                label="Project Logo URL"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                fullWidth
                variant="outlined"
              />
            </Col>
          </Row>

          <Button type="submit" variant="contained" color="primary">
            {defaultValues ? "Update Project" : "Create Project"}
          </Button>
        </form>
      </Card>
    </Container>
  );
}
