import React from 'react';
import { Card, Button } from 'react-bootstrap';

const EmployeeCard = ({ employee, onEdit, onDelete }) => {
  const profileImg = employee.profileImage || 'https://via.placeholder.com/200?text=No+Image';

  return (
    <Card style={{ width: '18rem' }} className="mb-3 shadow">
      <Card.Img
        variant="top"
        src={profileImg}
        alt="Profile"
        style={{
          height: '200px',
          objectFit: 'cover',
          borderRadius: '8px 8px 0 0',
        }}
      />
      <Card.Body>
        <Card.Title>{employee.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{employee.position}</Card.Subtitle>
        <Card.Text>{employee.email}</Card.Text>
        <Button variant="outline-primary" onClick={() => onEdit(employee)}>Edit</Button>{' '}
        <Button variant="outline-danger" onClick={() => onDelete(employee.id)}>Delete</Button>
      </Card.Body>
    </Card>
  );
};

export default EmployeeCard;
