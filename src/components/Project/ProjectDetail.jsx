import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProjectDetail = () => {
  const { id } = useParams();
  const project = useSelector((state) => state.projects.find(p => p.id === id));

  if (!project) return <p>Project not found.</p>;

  return (
    <div>
      <h2>{project.title}</h2>
      <img src={project.logo} alt="Project Logo" style={{ maxWidth: '150px' }} />
      <p>{project.description}</p>
      <p><strong>Start:</strong> {project.startDate}</p>
      <p><strong>End:</strong> {project.endDate}</p>
      <p><strong>Assigned:</strong> {project.assignedEmployees?.join(', ')}</p>
    </div>
  );
};

export default ProjectDetail;
