import { Link } from "react-router-dom";
import Titulo from "../components/Titulos.jsx";
import Button from "../components/Button";
import ButtonEliminar from "../components/ButtonDelete.jsx";
import useFetchUser from "../hooks/users/useFetchUser";
import { optionSelect } from "../utils/apiUrl.jsx";
import useUserActions from "../hooks/users/useUserAction";

//useFetchUser
//useUserActions

const Home = () => {
  const { users, getUser } = useFetchUser();
  const { deleteUser, handleUpdateUser } = useUserActions(getUser);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/users"
        className="text-2xl font-bold text-gray-900 mb-4 bg-green-100 p-2 rounded w-full text-center hover:bg-green-200 transition-colors block mb-6"
      >
        Agregar usuario
      </Link>

      <Titulo titulo="User Information" />

      <p className="mt-1 text-sm text-gray-600 mb-4">
        Lista de usuarios registrados.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700 text-left text-sm">
            <tr>
              <th className="px-4 py-2 border-b">Nombre</th>
              <th className="px-4 py-2 border-b">Apellido</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Especialidad</th>
              <th className="px-4 py-2 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2">{user.nombre}</td>
                <td className="px-4 py-2">{user.apellido}</td>
                <td className="px-4 py-2">{user.correo}</td>
                <td className="px-4 py-2">
                  {optionSelect.find((opt) => opt.value === user.especialidad)
                    ?.label || "sin asignar"}
                </td>
                <td className="px-4 py-2">
                  <Button
                    text="Editar"
                    onClick={() => handleUpdateUser(user.id)}
                  />

                  <ButtonEliminar
                    text="Eliminar"
                    onClick={() => deleteUser(user.id)}
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
