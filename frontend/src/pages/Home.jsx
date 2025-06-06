import { Link } from "react-router-dom";
import Titulo from "../components/Titulos.jsx";
import Button from "../components/Button";
import ButtonEliminar from "../components/ButtonDelete.jsx";
import useFetchEvents from "../hooks/users/useFetchEvent.jsx";
import { optionSelect } from "../utils/apiUrl.jsx";
import useEventActions from "../hooks/users/useUserAction.jsx";

//useFetchEvents
//useEventActions

const Home = () => {
  const { events, getEvents } = useFetchEvents();
  const { deleteEvent, handleUpdateEvent } = useEventActions(getEvents);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/events"
        className="text-2xl font-bold text-gray-900 mb-4 bg-green-100 p-2 rounded w-full text-center hover:bg-green-200 transition-colors block mb-6"
      >
        Agregar evento
      </Link>

      <Titulo titulo="Event Information" />

      <p className="mt-1 text-sm text-gray-600 mb-4">
        Lista de eventos registrados.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700 text-left text-sm">
            <tr>
              <th className="px-4 py-2 border-b">Evento</th>
              <th className="px-4 py-2 border-b">Dirección</th>
              <th className="px-4 py-2 border-b">Tipo de Evento</th>
              <th className="px-4 py-2 border-b">Descripción</th>
              <th className="px-4 py-2 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr
                key={event.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2">{event.evento}</td>
                <td className="px-4 py-2">{event.direccion}</td>
                <td className="px-4 py-2">
                  {optionSelect.find((opt) => opt.value === event.tipoEvento)
                    ?.label || "sin asignar"}
                </td>
                <td
                  className="px-4 py-2 max-w-xs truncate"
                  title={event.descripcion}
                >
                  {event.descripcion}
                </td>
                <td className="px-4 py-2">
                  <Button
                    text="Editar"
                    onClick={() => handleUpdateEvent(event.id)}
                  />

                  <ButtonEliminar
                    text="Eliminar"
                    onClick={() => deleteEvent(event.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
