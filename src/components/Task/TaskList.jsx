import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { moveTask, deleteTask } from "./taskSlice";
import TaskColumn from "./TaskColumn";
import ModalWrapper from "../Reusable/ModalWrapper";
import TaskForm from "./TaskForm";
import { Button } from "react-bootstrap";

const statuses = [
  "Need to Do",
  "In Progress",
  "Need for Test",
  "Completed",
  "Re-open",
];

const TaskList = () => {
    const tasks = useSelector((state) => {
        console.log('Redux state:', state);
        return state.tasks?.tasks || [];
      });
      
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;
    dispatch(moveTask({ taskId, status: newStatus }));
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  return (
    <>
      <Button
        className="mb-3"
        onClick={() => {
          setSelectedTask(null);
          setModalOpen(true);
        }}
      >
        Add Task
      </Button>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="d-flex gap-3 flex-wrap justify-content-between">
          {statuses.map((status) => (
            <TaskColumn
              key={status}
              title={status}
              tasks={tasks.filter((t) => t.status === status)}
              onEdit={handleEdit}
              onDelete={(id) => dispatch(deleteTask(id))}
            />
          ))}
        </div>
      </DragDropContext>

      <ModalWrapper
        title={selectedTask ? "Edit Task" : "Add Task"}
        show={modalOpen}
        onHide={() => setModalOpen(false)}
      >
        <TaskForm
          defaultValues={selectedTask}
          onClose={() => setModalOpen(false)}
        />
      </ModalWrapper>
    </>
  );
};

export default TaskList;
