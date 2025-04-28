import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { moveTask } from '../redux/slices/taskSlice';
import { Card, Form, Row, Col } from 'react-bootstrap';

const columns = [
  'Need to Do',
  'In Progress',
  'Need for Test',
  'Completed',
  'Re-open',
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks || []);
  const projects = useSelector((state) => state.projects?.projects || []);
  const [selectedProject, setSelectedProject] = useState('');

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    dispatch(moveTask({ taskId: draggableId, status: destination.droppableId }));
  };

  const filteredTasks = selectedProject
    ? tasks.filter(task => task.projectTitle === selectedProject)
    : tasks;

  const groupedTasks = columns.reduce((acc, column) => {
    acc[column] = filteredTasks.filter(task => task.status === column);
    return acc;
  }, {});

  return (
    <>
      <h2 className="text-center mb-4">Project Task Board</h2>

      <Form.Group className="mb-4" controlId="projectFilter">
        <Form.Label>Select Project</Form.Label>
        <Form.Select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
        >
          <option value="">All Projects</option>
          {projects.map((project) => (
            <option key={project.id} value={project.title}>
              {project.title}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Row>
          {columns.map((column) => (
            <Col key={column}>
              <h5 className="text-center">{column}</h5>
              <Droppable droppableId={column}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-light p-2 rounded min-vh-25"
                    style={{ minHeight: '300px' }}
                  >
                    {groupedTasks[column]?.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <Card
                            className="mb-3 shadow-sm"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Card.Body>
                              <Card.Text><strong>Task Title: </strong>{task.title}</Card.Text>
                              <Card.Text><strong>Project: </strong>{task.projectTitle}</Card.Text> 
                              <Card.Text>
                                <strong>ETA:</strong> {task.eta}<br />
                                <strong>Employee:</strong> {task.assignedEmployees}<br />
                              </Card.Text>
                              {task.referenceImage && (
                                <img
                                  src={task.referenceImage}
                                  alt="task"
                                  className="img-fluid rounded"
                                />
                              )}
                            </Card.Body>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Col>
          ))}
        </Row>
      </DragDropContext>
    </>
  );
};

export default Dashboard;
