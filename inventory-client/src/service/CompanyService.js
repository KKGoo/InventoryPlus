const companyService = () => {
  const createCompany = async (nit, name, address, phone) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/company`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ nit, name, address, phone }),
        }
      );

      if (!response.status) {
        const errorData = await response.status();
        throw new Error(errorData.reason);
      }
    } catch (error) {
      console.error("Error al crear empresa:", error);
      throw error;
    }
  };

  const getCompanies = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/company`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener la lista de empresas:", error);
      throw error;
    }
  };

  const deleteCompany = async (companyId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/company/${companyId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.status) {
        console.log(response.status)
      }
    } catch (error) {
      console.error("Error al eliminar empresa:", error);
      throw error;
    }
  };

  const updateCompany = async (nit, name, address, phone) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/company/${nit}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ nit, name, address, phone }),
        }
      );
  
      if (!response.status) {
        const errorData = await response.status();
        throw new Error(errorData.reason);
      }
    } catch (error) {
      console.error("Error al actualizar empresa:", error);
      throw error;
    }
  };

  return {
    createCompany,
    getCompanies,
    deleteCompany,
    updateCompany
  };
};

export default companyService;
