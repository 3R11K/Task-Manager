import React, { useState, useEffect } from 'react';
import { Container, Filters, Table, TableHeader, TableRow, TableCell } from './styles.tsx';
import TaskEditModal from '../EditTask/EditTaskModal.tsx';

interface Integrant {
  id: number;
  name: string;
}

const TaskList = ({ tasks, onSuccess, onError, onTasksUpdate, onLoading }) => {
  const [statusFilter, setStatusFilter] = useState('');
  const [reviewerFilter, setReviewerFilter] = useState('');
  const [assigneeFilter, setAssigneeFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
  const [sizes, setSizes] = useState<string[]>([]);
  const [reviewers, setReviewers] = useState<Integrant[]>([]);
  const [assignees, setAssignees] = useState<Integrant[]>([]);
  const [status, setStatus] = useState<string[]>([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [saveVisible, setSaveVisible] = useState(false);
  const [tasksStatusUpdate, setTasksStatusUpdate] = useState<{ id: number; status: string }[]>([]);

  const getFilters = () => {
    const sizes = new Set<string>();
    const reviewers = new Map<number, Integrant>();
    const assignees = new Map<number, Integrant>();
    const status = new Set<string>();

    tasks.forEach((task) => {
      if (task.data.size) sizes.add(task.data.size);
      if (task.data.reviewer) reviewers.set(task.data.reviewer.id, task.data.reviewer);
      if (task.data.assignee) assignees.set(task.data.assignee.id, task.data.assignee);
      if (task.status) status.add(task.status);
    });

    setSizes(Array.from(sizes));
    setReviewers(Array.from(reviewers.values()));
    setAssignees(Array.from(assignees.values()));
    setStatus(Array.from(status));
  };

  useEffect(() => {
    getFilters();
  }, [tasks]);

  const applyFilters = () => {
    return tasks.filter((task) => {
      const matchesStatus = statusFilter ? task.status === statusFilter : true;
      const matchesReviewer = reviewerFilter ? task.data.reviewer?.id === parseInt(reviewerFilter) : true;
      const matchesAssignee = assigneeFilter ? task.data.assignee?.id === parseInt(assigneeFilter) : true;
      const matchesSize = sizeFilter ? task.data.size === sizeFilter : true;

      return matchesStatus && matchesReviewer && matchesAssignee && matchesSize;
    });
  };

  const handleSaveTask = async (updatedTask) => {
    const apiUrl = `http://127.0.0.1:5000/tasks/update/${updatedTask.id}`;

    console.log('Task to update:', updatedTask);
    console.log('API URL:', apiUrl);
  
    // Estrutura para enviar ao backend
    const payload = {
      name: updatedTask.data.name,
      description: updatedTask.data.description,
      dor: updatedTask.data.dor,
      dod: updatedTask.data.dod,
      size: updatedTask.data.size,
      assignee: updatedTask.data.assignee.id,
      reviewer: updatedTask.data.reviewer.id,
      status: updatedTask.status,
      due_date: updatedTask.data.due_date,
      pr_link: updatedTask.data.pr_link,
      storiy: updatedTask.data.story,
    };
  
    try {
      // Chamada à API com método PUT
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: 'include',
      });
  
      // Processa a resposta
      const result = await response.json();
  
      if (response.ok) {
        // Atualize diretamente a tarefa na lista
        const index = tasks.findIndex((task) => task.id === updatedTask.id);
        if (index !== -1) {
          const newTasks = [...tasks];
          newTasks[index] = {
            ...updatedTask,
            ...result.task, // Atualiza a tarefa com os dados retornados do backend
          };
          onTasksUpdate(newTasks);
        }
        console.log('Task Updated:', result.task);
        setSelectedTask(null);
        onSuccess('Task updated successfully');
      } else {
        // Exibe erro retornado pelo backend
        onError(result.message || 'Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
      onError('An unexpected error occurred while updating the task');
    }
  };

  const handleStatusChangeTasks = () =>{
    console.log('Tasks Status Update:', tasksStatusUpdate);
    onLoading(true);

    fetch('http://localhost:5000/tasks/updates/status', {
      method:"PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"tasks":tasksStatusUpdate}),
      credentials: 'include'
  }).then(response => {
      if(response.ok){
          console.log('Status updated');
          setTasksStatusUpdate([]);
          onLoading(false);
          setSaveVisible(false);
          onSuccess("Status updated");
      }else{
          console.error('Error updating status:', response.statusText);
          onLoading(false);
          onError("Error updating status");
      }
    }).catch(error => {
      console.error('Error updating status:', error);
      onLoading(false);
      onError("Error updating status");
    });
  }

  const handleStatusChange = (task, status) => {
    // Atualize diretamente o status da tarefa
    task.status = status;
    setSaveVisible(true);
  
    // Informe o componente pai que as tarefas foram atualizadas
    if (onTasksUpdate) {
      onTasksUpdate(tasks); // Atualiza a lista inteira
    }
  
    // Atualize tasksStatusUpdate para registrar a mudança
    const index = tasksStatusUpdate.findIndex((taskStatus) => taskStatus.id === task.id);
    if (index === -1) {
      setTasksStatusUpdate([...tasksStatusUpdate, { id: task.id, status }]);
    } else {
      const newTasksStatusUpdate = [...tasksStatusUpdate];
      newTasksStatusUpdate[index] = { id: task.id, status };
      setTasksStatusUpdate(newTasksStatusUpdate);
    }
  };
  


  const filteredTasks = applyFilters();

  return (

    <Container>
      {/* Filtros */}
      <Filters>
        <label>
          Status:
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All</option>
            {status.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label>
          Reviewer:
          <select value={reviewerFilter} onChange={(e) => setReviewerFilter(e.target.value)}>
            <option value="">All</option>
            {reviewers.map((reviewer) => (
              <option key={reviewer.id} value={reviewer.id}>
                {reviewer.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Assignee:
          <select value={assigneeFilter} onChange={(e) => setAssigneeFilter(e.target.value)}>
            <option value="">All</option>
            {assignees.map((assignee) => (
              <option key={assignee.id} value={assignee.id}>
                {assignee.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Size:
          <select value={sizeFilter} onChange={(e) => setSizeFilter(e.target.value)}>
            <option value="">All</option>
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
      </Filters>

      {/* Tabela */}
      <Table>
        <TableHeader>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Assignee</th>
            <th>Reviewer</th>
            <th>Size</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </TableHeader>
        <tbody>
          {filteredTasks.map((task, index) => (
            <TableRow key={index} id={task.id}>
              <TableCell>{task.name}</TableCell>
              <TableCell>{task.data.description}</TableCell>
              <TableCell>{task.data.assignee?.name}</TableCell>
              <TableCell>{task.data.reviewer?.name}</TableCell>
              <TableCell>{task.data.size}</TableCell>
              <TableCell>
                <select value={task.status} onChange={(e) => handleStatusChange(task, e.target.value)}>
                  <option value={task.status}>{task.status}</option>
                  <option value="To Do">To Do</option>
                  <option value="Doing">Doing</option>
                  <option value="Reviewing">Reviewing</option>
                  <option value="Done">Done</option>
                </select>
              </TableCell>
              <TableCell>
                <button onClick={() => setSelectedTask(task)}>✏️</button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      {selectedTask && (
        <TaskEditModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onSave={handleSaveTask}
        />
      )}
      {
        saveVisible && (
          <button onClick={() => handleStatusChangeTasks()}>Save</button>
        )
      }
      {/* Toast que deve ter o css padrão dele e ignorar o global*/}

    </Container>
  );
};

export default TaskList;