import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addTask, updateTask } from "./taskSlice";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material"; 
import { toast } from "react-toastify";
import { Form as BootstrapForm } from "react-bootstrap";

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  employee: yup
    .array()
    .min(1, "At least one employee must be assigned")
    .required(),
  eta: yup.date().required(),
  referenceImage: yup.string().url().required(),
});

const TaskForm = ({ defaultValues, onClose, projectId }) => {
  const dispatch = useDispatch();

  const allEmployees = useSelector((state) => state.employees || []);
  const projectList = useSelector((state) => state.projects?.projects || []);

  const assigned =
    projectList.find((p) => p.id === projectId)?.assignedEmployees || [];

  const employees = allEmployees.filter((e) => assigned.includes(e.email));

  const [selectedEmployees, setSelectedEmployees] = useState(
    defaultValues?.employee || []
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (defaultValues) {
      setSelectedEmployees(defaultValues.employee || []);
    }
  }, [defaultValues]);

  const onSubmit = (data) => {
    const taskId = defaultValues?.id || Date.now();
    const taskData = { id: taskId, ...data, projectId };

    try {
      if (defaultValues) {
        dispatch(updateTask(taskData));
        toast.success("Task updated successfully!");
      } else {
        dispatch(addTask(taskData));
        toast.success("Task added successfully!");
      }

      const currentTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedTasks = defaultValues
        ? currentTasks.map((task) => (task.id === taskId ? taskData : task))
        : [...currentTasks, taskData];

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      onClose();
    } catch (error) {
      toast.error("Something went wrong while saving the task.");
      console.error(error);
    }
  };

  return (
    <BootstrapForm onSubmit={handleSubmit(onSubmit)}>
      <BootstrapForm.Group>
        <BootstrapForm.Label>Task Title</BootstrapForm.Label>
        <BootstrapForm.Control
          {...register("title")}
          isInvalid={errors.title}
        />
        <BootstrapForm.Control.Feedback type="invalid">
          {errors.title?.message}
        </BootstrapForm.Control.Feedback>
      </BootstrapForm.Group>

      <BootstrapForm.Group>
        <BootstrapForm.Label>Description</BootstrapForm.Label>
        <BootstrapForm.Control
          {...register("description")}
          isInvalid={errors.description}
        />
        <BootstrapForm.Control.Feedback type="invalid">
          {errors.description?.message}
        </BootstrapForm.Control.Feedback>
      </BootstrapForm.Group>
      <br />

      <BootstrapForm.Group>
        <FormControl fullWidth error={!!errors.employee}>
          <InputLabel>Assign Employees</InputLabel>
          <Select
            multiple
            value={selectedEmployees}
            onChange={(e) => setSelectedEmployees(e.target.value)}
            renderValue={(selected) => selected.join(", ")}
          >
            <MenuItem value="g@gmail.com">g@gmail.com</MenuItem>
          </Select>
          {errors.employee && (
            <FormHelperText>{errors.employee.message}</FormHelperText>
          )}
        </FormControl>
      </BootstrapForm.Group>

      <BootstrapForm.Group>
        <BootstrapForm.Label>ETA</BootstrapForm.Label>
        <BootstrapForm.Control
          type="date"
          {...register("eta")}
          isInvalid={errors.eta}
        />
        <BootstrapForm.Control.Feedback type="invalid">
          {errors.eta?.message}
        </BootstrapForm.Control.Feedback>
      </BootstrapForm.Group>

      <BootstrapForm.Group>
        <BootstrapForm.Label>Reference Image URL</BootstrapForm.Label>
        <BootstrapForm.Control
          {...register("referenceImage")}
          isInvalid={errors.referenceImage}
        />
        <BootstrapForm.Control.Feedback type="invalid">
          {errors.referenceImage?.message}
        </BootstrapForm.Control.Feedback>
      </BootstrapForm.Group>

      <Button className="mt-3" type="submit" variant="contained">
        {defaultValues ? "Update Task" : "Add Task"}
      </Button>
    </BootstrapForm>
  );
};

export default TaskForm;
