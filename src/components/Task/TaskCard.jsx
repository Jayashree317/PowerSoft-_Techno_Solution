import React from 'react';
import { Card, Button } from 'react-bootstrap';

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <Card className="mb-2" style={{ cursor: 'grab' }}>
      <Card.Img variant="top" src={task.referenceImage} height="150" />
      <Card.Body>
        <Card.Text><strong>Task Title:</strong>{task.title}</Card.Text>
        <Card.Text><strong>Project:</strong>{task.projectTitle}</Card.Text>
        <Card.Text><strong>Description:</strong>{task.description}</Card.Text>
        <Card.Text><strong>Assigned:</strong> {task.assignedEmployees.join(", ")}</Card.Text>
        <Card.Text><strong>ETA:</strong> {task.eta}</Card.Text>
        <Button variant="outline-primary" onClick={() => onEdit(task)}>Edit</Button>{' '}
        <Button variant="outline-danger" onClick={() => onDelete(task.id)}>Delete</Button>
      </Card.Body>
    </Card>
  );
};

export default TaskCard;
