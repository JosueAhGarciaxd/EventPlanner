import { useEffect } from "react";
import { url } from "../../utils/apiUrl"; // URL de la API
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import useFetchEvent from "./useFetchEvent.jsx";

const useDataEvent = (methods) => {
  const { getEventById, getEvents } = useFetchEvent();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const navigate = useNavigate();

  const saveEventForm = async (dataForm) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
      });
      if (!response.ok) {
        toast.error("Failed to add event");
        throw new Error("Failed to add event");
      }
      toast.success("Event saved successfully");
      navigate("/home");
    } catch (error) {
      console.log("Error al enviar:", error);
    } finally {
      reset();
      getEvents(); // Asegúrate de que getEvents esté definido
    }
  };

  const editEvent = async (dataForm) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
      });
      if (!response.ok) {
        toast.error("Failed to update event");
        throw new Error("Failed to update event");
      }
      toast.success("Event updated successfully");
      navigate("/home");
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Failed to update event");
    } finally {
      reset();
      getEvents(); // Asegúrate de que getEvents esté definido
    }
  };

  const handleEventAction = (dataForm) => {
    if (id) {
      editEvent(dataForm);
    } else {
      saveEventForm(dataForm);
    }
  };

  const handleUpdateEvent = (id) => {
    navigate(`/events/${id}`);
  };

  const loadEvent = async () => {
    if (id) {
      const event = await getEventById(id);
      if (event) {
        reset({
          evento: event?.evento,
          direccion: event?.direccion,
          tipoEvento: event?.tipoEvento,
          descripcion: event?.descripcion,
        });
      }
    }
  };

  useEffect(() => {
    loadEvent();
  }, [id]);

  return {
    register,
    handleSubmit: handleSubmit(handleEventAction),
    errors,
    getEventById,
    handleUpdateEvent,
    loadEvent,
  };
};

export default useDataEvent;
