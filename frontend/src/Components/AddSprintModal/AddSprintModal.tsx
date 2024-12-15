import React, { useState } from "react";
import { SketchPicker } from "react-color"; // Importando a roda de cores
import { ModalContainer, Overlay, Input, ButtonContainer, Button, TaskSizeContainer, TaskSizeItem } from "./style.tsx";

interface AddSprintModalProps {
  onClose: () => void;
}

const AddSprintModal: React.FC<AddSprintModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    sprint_name: "",
    sprint_description: "",
    config: {
      sizes: { G: 120, M: 60, P: 30, PP: 15 },
      colors: {
        G: "#ff000d",
        M: "#c300ff",
        P: "#00bbff",
        PP: "#00ff55",
      },
      start_date: "",
      end_date: "",
    },
    sprint_num: 1,
    group_id: 1,
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.includes("sizes")) {
      const sizeKey = name.split(".")[1]; // Ex: "sizes.G" => "G"
      setFormData((prev) => ({
        ...prev,
        config: {
          ...prev.config,
          sizes: {
            ...prev.config.sizes,
            [sizeKey]: parseInt(value, 10),
          },
        },
      }));
    } else if (name === "start_date" || name === "end_date") {
      // Atualizando start_date e end_date dentro de config
      setFormData((prev) => ({
        ...prev,
        config: {
          ...prev.config,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleColorChange = (color: string, sizeKey: string) => {
    setFormData((prev) => ({
      ...prev,
      config: {
        ...prev.config,
        colors: {
          ...prev.config.colors,
          [sizeKey]: color,
        },
      },
    }));
  };

  const handleAddSprint = async () => {
    try {
      const response = await fetch("http://localhost:5000/conf/add-sprint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sprint: formData }),
        credentials: "include", 
      });

      const data = await response.json();
      if (response.ok) {
        setResponseMessage("Sprint adicionada com sucesso!");
        console.log("Resposta do servidor:", data);
        onClose(); // Fecha o modal após adicionar a sprint
      } else {
        setResponseMessage(`Erro: ${data.error || "Falha ao adicionar sprint"}`);
        console.error("Erro na resposta:", data);
      }
    } catch (error) {
      setResponseMessage("Erro ao se conectar com o servidor.");
      console.error("Erro ao enviar a requisição:", error);
    }
  };

  return (
    <Overlay>
      <ModalContainer>
        <h1>Add New Sprint</h1>
        <Input
          type="text"
          name="sprint_name"
          placeholder="Sprint Name"
          value={formData.sprint_name}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="sprint_description"
          placeholder="Sprint Description"
          value={formData.sprint_description}
          onChange={handleInputChange}
        />
        <Input
          type="date"
          name="start_date"
          placeholder="Sprint Start Date"
          value={formData.config.start_date}
          onChange={handleInputChange}
        />
        <Input
          type="date"
          name="end_date"
          placeholder="Sprint End Date"
          value={formData.config.end_date}
          onChange={handleInputChange}
        />

        <h3>Define Task Sizes</h3>
        <TaskSizeContainer>
          {Object.keys(formData.config.sizes).map((sizeKey) => (
            <TaskSizeItem key={sizeKey}>
              <label>
                {sizeKey} Time (minutes):
                <Input
                  type="number"
                  name={`sizes.${sizeKey}`}
                  value={formData.config.sizes[sizeKey]}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                {sizeKey} Color:
                <SketchPicker
                  color={formData.config.colors[sizeKey]}
                  onChangeComplete={(color) => handleColorChange(color.hex, sizeKey)}
                />
              </label>
            </TaskSizeItem>
          ))}
        </TaskSizeContainer>

        <ButtonContainer>
          <Button onClick={handleAddSprint}>Add Sprint</Button>
          <Button onClick={onClose}>Cancel</Button>
        </ButtonContainer>

        {responseMessage && <p>{responseMessage}</p>}
      </ModalContainer>
    </Overlay>
  );
};

export default AddSprintModal;
