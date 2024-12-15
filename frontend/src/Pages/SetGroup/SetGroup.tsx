import React, { useState, useEffect } from "react";
import { SetGroupContainer, SquareContainer, ToggleContainer, ToggleSlider, Label, Input, Dropdown, DropdownItem } from "./style.tsx";
import { ToastContainer, toast } from "react-toastify"; // Importe o toast
import "react-toastify/dist/ReactToastify.css"; // Importe o estilo padrão do react-toastify
import { useAuth } from "../../Context/AuthContext.tsx";

const SetGroup: React.FC = () => {
  const [selected, setSelected] = useState("Create");
  const [groups, setGroups] = useState<{ name: string; id: number }[]>([]);
  const [mygroup, setGroup] = useState<{ name: string; password: string }>({ name: "", password: "" });
  const [showDropdown, setShowDropdown] = useState(false);
  const { setNewGroup } = useAuth();

  const getGroups = async () => {
    const response = await fetch("http://localhost:5000/group/get-groups", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    setGroups(data);
  };

  const handleSetGroup = async () => {
    if (selected === "Create") {
      const response = await fetch("http://localhost:5000/users/create-group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(mygroup),
      });
      if (response.status === 200 || response.status === 201) {
        toast.success("Group created!");
        setNewGroup(mygroup.name);
        window.location.href = "/";
      } else {
        toast.error("Error creating group");
      }
    } else {
      const response = await fetch("http://localhost:5000/users/define-group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(mygroup),
      });
      if (response.status === 200) {
        toast.success("Group entered!");
        setNewGroup(mygroup.name);
        window.location.href = "/";
      } else {
        toast.error("Error entering group");
      }
    }
  }

  useEffect(() => {
    getGroups();
  }, []);

  const toggleSelection = () => {
    setSelected((prev) => (prev === "Create" ? "Enter" : "Create"));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroup({ ...mygroup, name: e.target.value });
    if (selected === "Enter" && groups.length > 0) {
      setShowDropdown(true);
    }
  };

  const handleSelectGroup = (name: string) => {
    setGroup({ ...mygroup, name });
    setShowDropdown(false);
  };

  return (
    <SetGroupContainer>
  <SquareContainer>
    <ToggleContainer onClick={toggleSelection}>
      <ToggleSlider selected={selected === "Enter"} />
      <Label selected={selected === "Create"}>Create</Label>
      <Label selected={selected === "Enter"}>Enter</Label>
    </ToggleContainer>

    {/* Input para nome */}
    <Input
      type="text"
      placeholder="Name"
      value={mygroup.name}
      onChange={handleInputChange}
      onFocus={() => setShowDropdown(selected === "Enter" && groups.length > 0)}
      onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // Timeout para permitir clique
    />

    {/* Dropdown customizado */}
    {showDropdown && selected === "Enter" && groups.length > 0 && (
      <Dropdown>
        {groups
          .filter((g) => g.name.toLowerCase().includes(mygroup.name.toLowerCase()))
          .map((g) => (
            <DropdownItem key={g.id} onClick={() => handleSelectGroup(g.name)}>
              {g.name}
            </DropdownItem>
          ))}
      </Dropdown>
    )}

    {/* Input para senha */}
    <Input
      type="password"
      placeholder="Password"
      value={mygroup.password}
      onChange={(e) => setGroup({ ...mygroup, password: e.target.value })}
    />
      
      {/* Botão para criar ou entrar no grupo */}
      <button onClick={handleSetGroup}>{selected}</button>
  </SquareContainer>
  <ToastContainer /> 
</SetGroupContainer>
  );
};

export default SetGroup;
