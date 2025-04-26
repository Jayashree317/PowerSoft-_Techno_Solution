import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProject } from '../../redux/slices/projectSlice';
import ProjectCard from './ProjectCard';
import ProjectForm from '../../pages/ProjectForm';
import { Button, Container, Row, Col } from 'react-bootstrap';
import ModalWrapper from '../Reusable/ModalWrapper';

const ProjectList = () => {
     const projects = useSelector((state) => state.projects.projects);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleEdit = (project) => {
    setEditData(project);
    setModalOpen(true);
  };

  const handleDelete = (id) => dispatch(deleteProject(id));

  return (
    <Container>
      <h2 className="my-4">Projects</h2>
      <Button onClick={() => { setEditData(null); setModalOpen(true); }}>
        Add Project
      </Button>
      <Row className="mt-3">
        {projects.map(project => (
          <Col key={project.id} sm={12} md={6} lg={4}>
            <ProjectCard project={project} onEdit={handleEdit} onDelete={handleDelete} />
          </Col>
        ))}
      </Row>

      <ModalWrapper
        title={editData ? 'Edit Project' : 'Add Project'}
        show={modalOpen}
        onHide={() => setModalOpen(false)}
      >
        <ProjectForm defaultValues={editData} onClose={() => setModalOpen(false)} />
      </ModalWrapper>
    </Container>
  );
};

export default ProjectList;
