import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ProjectCard = ({ project, onEdit, onDelete }) => {
  return (
    <Card className="mb-3">
      <Card.Img variant="top" src={project.logo} />
      <Card.Body>
        <Card.Title>{project.title}</Card.Title>
        <Card.Text>{project.description}</Card.Text>
        <Card.Text>
          <small>Start: {project.startDate}</small>
        </Card.Text>
        <Card.Text>
          <small>End: {project.endDate}</small>
        </Card.Text>
        
        <Card.Text>
          <small>
            Assigned Employees: {project.assignedEmployees ? project.assignedEmployees.join(', ') : 'None'}
          </small>
        </Card.Text>

        <Button variant="outline-primary" onClick={() => onEdit(project)}>Edit</Button>{' '}
        <Button variant="outline-danger" onClick={() => onDelete(project.id)}>Delete</Button>
      </Card.Body>
    </Card>
  );
};

export default ProjectCard;
