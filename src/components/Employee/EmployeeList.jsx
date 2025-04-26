import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EmployeeCard from './EmployeeCard';
import ModalWrapper from '../Reusable/ModalWrapper';
import { deleteEmployee } from '../../redux/slices/employeeSlice';
import { Button, Container, Row, Col } from 'react-bootstrap';
import EmployeeForm from '../../pages/Employeeform';
const EmployeeList = () => {
  const employees = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleEdit = (emp) => {
    setEditData(emp);
    setModalOpen(true);
  };

  const handleDelete = (id) => dispatch(deleteEmployee(id));

  return (
    <Container>
      <h2 className="my-4">Employees</h2>
      <Button onClick={() => { setEditData(null); setModalOpen(true); }}>
        Add Employee
      </Button>
      <Row className="mt-3">
        {employees.map(emp => (
          <Col key={emp.id} sm={12} md={6} lg={4}>
            <EmployeeCard employee={emp} onEdit={handleEdit} onDelete={handleDelete} />
          </Col>
        ))}
      </Row>

      <ModalWrapper title={editData ? 'Edit Employee' : 'Add Employee'} show={modalOpen} onHide={() => setModalOpen(false)}>
        <EmployeeForm defaultValues={editData} onClose={() => setModalOpen(false)} />
      </ModalWrapper>
    </Container>
  );
};

export default EmployeeList;
