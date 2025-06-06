import { useEffect, useState } from "react";
import { url } from "../../utils/apiUrl";
import { toast } from "react-hot-toast";

const useFetchEvents = () => {
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    try {
      const response = await fetch(url); // Asegúrate de usar await aquí
      if (!response.ok) {
        throw new Error("Error fetching events");
      }

      const data = await response.json(); // Asegúrate de usar await aquí
      setEvents(data);
    } catch (error) {
      console.error("error fetching events:", error);
      toast.error("Error fetching events");
    }
  };

  //funcion para obtener un evento por su id
  //se usa async/await para manejar la asincronía de la llamada a la API

  const getEventById = async (id) => {
    try {
      const response = await fetch(`${url}/${id}`);
      if (!response.ok) {
        console.log("Failed to fetch event");
        throw new Error("Failed to fetch event");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching event:", error);
      console.log("Failed to fetch event");
      return null;
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return {
    events,
    getEventById,
    getEvents
  };
};

export default useFetchEvents;