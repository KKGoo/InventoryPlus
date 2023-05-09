import React, { useState } from "react";

const EnterpriseForm = () => {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [nit, setNit] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleDireccionChange = (event) => {
    setDireccion(event.target.value);
  };

  const handleNitChange = (event) => {
    setNit(event.target.value);
  };

  const handleTelefonoChange = (event) => {
    setTelefono(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes enviar la información de la empresa al servidor
    console.log(nombre, direccion, nit, telefono);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre de la empresa:
        <input type="text" value={nombre} onChange={handleNombreChange} />
      </label>
      <br />
      <label>
        Dirección:
        <input type="text" value={direccion} onChange={handleDireccionChange} />
      </label>
      <br />
      <label>
        NIT:
        <input type="text" value={nit} onChange={handleNitChange} />
      </label>
      <br />
      <label>
        Teléfono:
        <input type="text" value={telefono} onChange={handleTelefonoChange} />
      </label>
      <br />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default EnterpriseForm;
