import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const TaskColumn = ({ title, tasks, onEdit, onDelete }) => (
  <div className="column bg-light p-2 rounded">
    <h5>{title}</h5>
    <Droppable droppableId={title}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} className="task-list">
          {tasks.map((task, index) => (
            <div key={task.id}>
              <TaskCard task={task} onEdit={onEdit} onDelete={onDelete} index={index} />
            </div>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

export default TaskColumn;
