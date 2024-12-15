import React, { useState, useEffect } from 'react';
import { ModalContainer, ModalContent, ModalHeader, ModalBody, ModalFooter, Overlay } from './styles.tsx';
import { Loading } from '../Loading/Loading.tsx';
const TaskModal = ({ task, onClose, onSave }) => {
  const [editedTask, setEditedTask] = useState(task);
  const [isLoading, setIsLoading] = useState(true);
  const [isPrLinkEnabled, setIsPrLinkEnabled] = useState(
    task.status === 'Reviewing' || task.status === 'Done'
  );
  const [groupUsers, setGroupUsers] = useState<{ id: number; name: string }[]>([]);

  const getGroupUsers = async () => {
    fetch('http://localhost:5000/group/members', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(response => {
      if (response.ok) {
        return response.json();
      }else{
        setIsLoading(false);
        console.log('Failed to fetch group members');
      }
      }).then(data => {
        setGroupUsers(data[0]);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getGroupUsers();
  }, []);


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
    console.log("that fucking task is beeing edited:",editedTask);
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
            {/* Primeira linha */}
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

            {/* Segunda linha */}
            <label>
              Assignee:
              <select
              value={editedTask.data.assignee.id}
              onChange={(e) => {
                const selectedUser = groupUsers.find(user => user.id === parseInt(e.target.value));
                handleChange('data.assignee', { id: parseInt(e.target.value), name: selectedUser ? selectedUser.name : '' });
              }}
              >
              {groupUsers.map(user => (
                <option key={user.id} value={user.id}>
                {user.name}
                </option>
              ))}
              </select>
            </label>
            <label>
              Reviewer:
              <select
              value={editedTask.data.reviewer.id}
              onChange={(e) => {
                const selectedUser = groupUsers.find(user => user.id === parseInt(e.target.value));
                handleChange('data.reviewer', { id: parseInt(e.target.value), name: selectedUser ? selectedUser.name : '' });
              }}
              >
              {groupUsers.map(user => (
                <option key={user.id} value={user.id}>
                {user.name}
                </option>
              ))}
              </select>
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

            {/* Terceira linha */}
            <label>
              Story:
              <input
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
             {/* ------------------------- */}
            {/* Quarta linha */}
            <label>
              DoR:
              <textarea className='definition'
                value={editedTask.data.dor}
                onChange={(e) => handleChange('data.dor', e.target.value)}
              />
            </label>
            <label>
              DoD:
              <textarea className='definition'
                value={editedTask.data.dod}
                onChange={(e) => handleChange('data.dod', e.target.value)}
              />
            </label>

            {/* Quinta linha */}
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
      {isLoading && <Loading />}
    </Overlay>
  );
};

export default TaskModal;
