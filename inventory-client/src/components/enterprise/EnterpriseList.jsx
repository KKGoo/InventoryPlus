import React from "react";

function EnterpriseList({ enterprises, user }) {

  const isAdmin = user?.isAdmin;

  const handleEditEnterprise = (enterprise) => {
    // Abrir formulario de edición de empresa
    console.log(`Edit enterprise with ID ${enterprise.id}`);
  };

  const handleDeleteEnterprise = (enterprise) => {
    // Llamar a función de eliminación de empresa
    console.log(`Delete enterprise with ID ${enterprise.id}`);
  };

  return (
    <div className="enterprise-list-container">
      <h1>Enterprises</h1>
      <ul>
        {enterprises.map((enterprise) => (
          <li key={enterprise?.id}>
            <h2>{enterprise?.name}</h2>
            <p>Address: {enterprise?.address}</p>
            <p>NIT: {enterprise?.nit}</p>
            <p>Phone: {enterprise?.phone}</p>
              <div>
                <button onClick={() => handleEditEnterprise(enterprise)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteEnterprise(enterprise)}>
                  Delete
                </button>
              </div>
           </li>
        ))}
      </ul>
    </div>
  );
}

export default EnterpriseList;