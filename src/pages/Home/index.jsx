import "./style.css";

import { useEffect, useRef, useState } from "react";

import Trash from "../../assets/recyclebinfilled_recycling_full_garbage_1993.png";
import api from "../../services/api";

function Home() {
  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    const usersFromApi = await api.get("/usuarios");

    setUsers(usersFromApi.data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function createUsers() {
    await api.post("/usuarios", {
      name: inputName.current.value,
      email: inputEmail.current.value,
      age: inputAge.current.value,
    });

    // Limpeza do compo de formulario
    inputName.current.value = "";
    inputEmail.current.value = "";
    inputAge.current.value = "";
    getUsers();
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`);
  }

  return (
    <div className="container">
      <form>
        <h1>Cadastrado de Usuarios</h1>
        <input placeholder="Nome" name="name" type="text" ref={inputName} />
        <input placeholder="Idade" name="age" type="number" ref={inputAge} />
        <input placeholder="Email" name="email" type="email" ref={inputEmail} />
        <button onClick={createUsers} type="button" className="btn">
          Cadastrar
        </button>
      </form>

      {users.map(user => (
        <div key={user.id} className="card">
          <div>
            <p>
              Name: <span>{user.name}</span>
            </p>
            <p>
              Age: <span>{user.age}</span>
            </p>
            <p>
              Email: <span>{user.email}</span>
            </p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} className="img-trash" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
