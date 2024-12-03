import React, { useState, useEffect } from 'react';
import { ModalContainer, ModalContent, ModalHeader, ModalBody, ModalFooter, Overlay } from './styles.tsx';

const TaskModal = ({ task, onClose, onSave }) => {
  const [editedTask, setEditedTask] = useState(task);
  const [isPrLinkEnabled, setIsPrLinkEnabled] = useState(
    task.status === 'Reviewing' || task.status === 'Done'
  );

  useEffect(() => {
    setIsPrLinkEnabled(editedTask.status === 'Reviewing' || editedTask.status === 'Done');
  }, [editedTask.status]);

  // Função genérica para lidar com alterações
  const handleChange = (field, value) => {
    if (field.includes('.')) {
      // Para campos aninhados
      const [outerKey, innerKey] = field.split('.');
      setEditedTask((prev) => ({
        ...prev,
        [outerKey]: {
          ...prev[outerKey],
          [innerKey]: value,
        },
      }));
    } else {
      // Para campos de nível superior
      setEditedTask((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSave = () => {
    onSave(editedTask);
  };

  return (
    <Overlay>
      <ModalContainer>
        <ModalContent>
          <ModalHeader>
            <h2>Edit Task</h2>
            <button onClick={onClose}>✖️</button>
          </ModalHeader>
          <ModalBody>
            <label>
              Name:
              <input
                type="text"
                value={editedTask.data.name}
                onChange={(e) => handleChange('data.name', e.target.value)}
              />
            </label>

            <label>
              Description:
              <textarea
                value={editedTask.data.description}
                onChange={(e) => handleChange('data.description', e.target.value)}
              />
            </label>

            <label>
              Status:
              <select
                value={editedTask.status}
                onChange={(e) => handleChange('status', e.target.value)}
              >
                <option value="To Do">To Do</option>
                <option value="Doing">Doing</option>
                <option value="Reviewing">Reviewing</option>
                <option value="Done">Done</option>
              </select>
            </label>

            <label>
              Assignee:
              <input
                type="text"
                value={editedTask.data.assignee.name}
                onChange={(e) => handleChange('data.assignee', { ...editedTask.data.assignee, name: e.target.value })}
              />
            </label>

            <label>
              Reviewer:
              <input
                type="text"
                value={editedTask.data.reviewer.name}
                onChange={(e) => handleChange('data.reviewer', { ...editedTask.data.reviewer, name: e.target.value })}
              />
            </label>

            <label>
              Size:
              <select
                value={editedTask.data.size}
                onChange={(e) => handleChange('data.size', e.target.value)}
              >
                <option value="P">P</option>
                <option value="M">M</option>
                <option value="G">G</option>
              </select>
            </label>

            <label>
              Story:
              <textarea
                value={editedTask.data.story}
                onChange={(e) => handleChange('data.story', e.target.value)}
              />
            </label>

            <label>
              Due Date:
              <input
                type="date"
                value={new Date(editedTask.data.due_date).toISOString().split('T')[0]}
                onChange={(e) => handleChange('data.due_date', e.target.value)}
              />
            </label>

            {isPrLinkEnabled && (
              <label>
                PR Link:
                <input
                  type="url"
                  value={editedTask.data.pr_link}
                  onChange={(e) => handleChange('data.pr_link', e.target.value)}
                />
              </label>
            )}
          </ModalBody>
          <ModalFooter>
            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Cancel</button>
          </ModalFooter>
        </ModalContent>
      </ModalContainer>
    </Overlay>
  );
};

export default TaskModal;
