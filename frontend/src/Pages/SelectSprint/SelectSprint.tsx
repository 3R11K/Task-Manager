import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext.tsx";
import Header from "../../Components/Header/Header.tsx";
import { Loading } from "../../Components/Loading/Loading.tsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, AddSprintButton } from "./style.tsx";
import AddSprintModal from "../../Components/AddSprintModal/AddSprintModal.tsx";
import SprintCard from "../../Components/SprintCard/SprintCard.tsx";

interface Sprint {
  id: string;
  sprint_name: string;
  sprint_description: string;
}


const SelectSprint: React.FC = () => {
  const { name } = useAuth();
  const [loading, setLoading] = useState(true);
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [showModal, setShowModal] = useState(false);

  const getConfs = async () => {
    try {
      const response = await fetch("http://localhost:5000/conf/get_conf", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setSprints(data.confs || []);
      } else {
        toast.error("No sprints found");
      }
    } catch (error) {
      toast.error("An error occurred while fetching sprints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getConfs();
  }, []);

  return (
    <div>
      <Header />
      <Container>
        {loading && <Loading />}

        {!loading && (
          <>
            {sprints.length === 0 ? (
              <>
                <h1>No sprints created yet, let's create one?</h1>
              </>
            ) : (
              <>
                <h1>Hi {name}, here are your sprints</h1>
                <div>
                                {sprints.map((sprint) => (
                  <SprintCard
                    key={sprint.id}
                    config_data={sprint}
                  />
                ))}
                </div>
              </>
            )}
            <AddSprintButton onClick={() => setShowModal(true)}>
              + Add new sprint
            </AddSprintButton>
            {showModal && <AddSprintModal onClose={() => setShowModal(false)} />}
          </>
        )}
      </Container>
      <ToastContainer />
    </div>
  );
};

export default SelectSprint;
