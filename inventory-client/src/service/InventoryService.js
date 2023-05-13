

const inventoryService = () => {
    const createInventoryItem = async (id, companyNit, name, quantity, price) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/company/${companyNit}/items`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({id ,name, quantity, price}),
          }
        );
        return response.status;
      } catch (error) {
        console.error("Error al crear el item de inventario:", error);
        throw error;
      }
    };
  
    const getInventoryItems = async (companyNit) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/company/${companyNit}/items`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error al obtener la lista de items de inventario:", error);
        throw error;
      }
    };
  
    const deleteInventoryItem = async (itemId) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/inventory/${itemId}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );
  
        if (response.status) {
          console.log(response.status);
        }
      } catch (error) {
        console.error("Error al eliminar el item de inventario:", error);
        throw error;
      }
    };
  
    const updateInventoryItem = async (itemId, name, quantity, price) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/inventory/${itemId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ name, quantity, price }),
          }
        );
  
        if (!response.status) {
          const errorData = await response.status();
          throw new Error(errorData.reason);
        }
      } catch (error) {
        console.error("Error al actualizar el item de inventario:", error);
        throw error;
      }
    };
  
    return {
      createInventoryItem,
      getInventoryItems,
      deleteInventoryItem,
      updateInventoryItem,
    };
  };
  
  export default inventoryService;