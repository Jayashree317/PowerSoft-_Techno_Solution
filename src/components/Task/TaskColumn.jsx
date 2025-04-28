import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const TaskColumn = ({ title, tasks, onEdit, onDelete ,employees}) => {
  return (
    <div className="column bg-light p-2 rounded" style={{ width: "300px", minHeight: "500px" }}>
      <h5 className="text-center">{title}</h5>

      <Droppable droppableId={title}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="task-list"
            style={{
              background: snapshot.isDraggingOver ? "#e3f2fd" : "#f8f9fa",
              padding: 8,
              minHeight: 500,
              borderRadius: 8,
            }}
          >
            {tasks.map((task, index) => (
              <div key={task.id} style={{ marginBottom: "8px" }}>
                <TaskCard
                  task={task}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  employees={employees}
                  index={index} 
                />
              </div>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
