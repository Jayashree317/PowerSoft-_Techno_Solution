import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { TextField, Button, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addEmployee, updateEmployee } from '../redux/slices/employeeSlice';

const schema = yup.object().shape({
  name: yup.string().required(),
  position: yup.string().required(),
  email: yup.string().email().required(),
});

export default function EmployeeForm({ defaultValues, onClose }) {
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(defaultValues?.profileImage || '');

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || {
      name: '',
      position: '',
      email: '',
    },
  });

  const onSubmit = (data) => {
    const profileImageUrl = previewUrl; 
    const finalData = { ...data, profileImage: profileImageUrl };

    let employees = JSON.parse(localStorage.getItem('employees')) || [];

    if (defaultValues) {
      const updatedEmployee = { ...defaultValues, ...finalData };
      employees = employees.map((emp) =>
        emp.id === defaultValues.id ? updatedEmployee : emp
      );
      dispatch(updateEmployee(updatedEmployee));
      toast.success('Employee updated successfully!');
    } else {
      const newEmployee = { id: Date.now(), ...finalData };
      employees.push(newEmployee);
      dispatch(addEmployee(newEmployee));
      toast.success('Employee added successfully!');
    }

    localStorage.setItem('employees', JSON.stringify(employees));
    onClose();
  };

  return (
    <Container className="my-4">
      <Card className="p-4 shadow">
        <Typography variant="h5" gutterBottom>
          {defaultValues ? 'Edit Employee' : 'Add New Employee'}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-3">
            <Col>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Name" fullWidth variant="outlined" />
                )}
              />
            </Col>
            <Col>
              <Controller
                name="position"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Position" fullWidth variant="outlined" />
                )}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Official Email" fullWidth variant="outlined" />
                )}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <div
                {...getRootProps()}
                style={{
                  border: '2px dashed #ccc',
                  padding: '20px',
                  textAlign: 'center',
                  borderRadius: '10px',
                  background: isDragActive ? '#f0f8ff' : '#fafafa',
                }}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the profile image here ...</p>
                ) : (
                  <p>Drag and drop profile image here, or click to select</p>
                )}
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    style={{ maxWidth: '100px', marginTop: '10px', borderRadius: '8px' }}
                  />
                )}
              </div>
            </Col>
          </Row>

          <Button type="submit" variant="contained" color="primary">
            {defaultValues ? 'Update' : 'Submit'}
          </Button>
        </form>
      </Card>
    </Container>
  );
}
