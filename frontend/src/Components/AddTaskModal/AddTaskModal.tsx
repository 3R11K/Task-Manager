import React, { useState, useEffect } from "react";
import { ModalWrapper, ModalContent, Button } from "./styles.tsx";

const AddTaskModal = ({ isOpen, onClose, onAdd, onSuccess, onError, onLoading }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dor, setDor] = useState("");
  const [dod, setDod] = useState("");
  const [size, setSize] = useState("");
  const [assignee, setAssignee] = useState<Member | null>(null);
  const [reviewer, setReviewer] = useState<Member | null>(null);
  const [dueDate, setDueDate] = useState("");
  const [story, setStory] = useState("");
  interface Member {
    id: string;
    name: string;
  }
  
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetchMembers();
    }
  }, [isOpen]);

  const fetchMembers = async () => {
    try {
      onLoading(true);
      const response = await fetch("http://localhost:5000/group/members", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch group members");
      }

      const data = await response.json();
      setMembers(data[0]);
    } catch (error) {
      console.error("Error fetching members:", error);
      onError("Failed to fetch members");
    } finally {
      onLoading(false);
    }
  };

  const handleSubmit = async () => {
    // VALIDA if not task["name"] or not task["size"] or not task["assignee"] or not task["status"] or not task["due_date"] or not task["story"]:
    if (!taskName || !size || !assignee || !dueDate || !story) {
      return onError("Please fill all the required fields");
    }

    const payload = {
      name: taskName,
      description,
      dor,
      dod,
      size,
      assignee: assignee,
      reviewer: reviewer,
      status: "To Do",
      due_date: dueDate,
      story,
      pr_link: "",
    };

    console.log("Payload:", payload);

    try {
      onLoading(true);

      const response = await fetch("http://localhost:5000/tasks/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        onSuccess("Task created successfully");
        console.log("Task created:", result.task);
        window.location.reload();
      } else {
        onError(result.message || "Failed to create task");
      }
    } catch (error) {
      onError("An unexpected error occurred while creating the task");
      console.error("Error creating task:", error);
    } finally {
      onLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalWrapper>
      <ModalContent>
        <h2>Add New Task</h2>
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />
        <textarea

          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />
        <textarea
          placeholder="DoR"
          value={dor}
          onChange={(e) => setDor(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />
        <textarea
          placeholder="DoD"
          value={dod}
          onChange={(e) => setDod(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />
        <select value={size} onChange={(e) => setSize(e.target.value)} style={{ width: "100%", padding: "8px", marginBottom: "8px" }}>
          <option value="">Select Size</option>
          <option value="PP">PP</option>
          <option value="P">P</option>
          <option value="M">M</option>
          <option value="G">G</option>
        </select>
        { members.length > 0 &&
        
          <>
        <select
          value={assignee ? assignee.name : ""}
          onChange={(e) => {
            const selectedMember = members.find(member => member.name === e.target.value) || null;
            setAssignee(selectedMember);
          }}
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        >
          <option value="">Select Assignee</option>
          {members.map((member) => (
            <option key={member.id} value={member.name}>
              {member.name}
            </option>
          ))}
        </select>
        <select
          value={reviewer ? reviewer.name : ""}
          onChange={(e) => setReviewer(members.find(member => member.name === e.target.value) || null)}
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        >
          <option value="">Select Reviewer</option>
          {members.map((member) => (
            <option key={member.id} value={member.name}>
              {member.name}
            </option>
          ))}
        </select>
        </>
        }
        <input
          type="date"
          placeholder="Due Date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />
        <input
          type="text"
          placeholder="Story"
          value={story}
          onChange={(e) => setStory(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />
        <Button onClick={handleSubmit}>Add Task</Button>
        <Button onClick={onClose} style={{ backgroundColor: "#f44336" }}>
          Cancel
        </Button>
      </ModalContent>
    </ModalWrapper>
  );
};

export default AddTaskModal;
