import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import inventoryService from "../service/InventoryService";
import { FiEdit, FiDelete, FiFilePlus } from "react-icons/fi";
import Header from "../components/common/Header";
import InventoryPDF from "../components/common/PdfGenerator";
import CreateProductModal from "../components/common/modal";

const inventoryServices = inventoryService();

function EnterpriseInventory() {
  const { nit } = useParams(); // Obtener el parámetro de la ruta dinámica
  const [inventory, setInventory] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchInventory = async () => {
    try {
      const response = await inventoryServices.getInventoryItems(nit);
      console.log(response);
      setInventory(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {

    fetchInventory();
  }, [nit]);

  const handleDeleteInventory = async (companyNit) => {
    const response = await inventoryServices.deleteInventoryItem(companyNit);
    console.log(response);
  };

  const handleCreateInventory = async () => {
    setShowModal(true)
  };

  const handleEditInventory = (company) => {
    //setEditingCompany(company);
    //setShowModal(true);
  };

  return (
    <>
      <Header title="InventoryPlus" />
      <div className="container-inventory">
        <div className="enterprise-inventory-container">
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>
                  <div className="actions">
                    <button
                      className="actions-buttons"
                      onClick={handleCreateInventory}
                    >
                      <FiFilePlus />
                    </button>
                    <InventoryPDF inventory={inventory} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((product) => (
                <tr key={product?.id}>
                  <td>{product?.name}</td>
                  <td>{product?.description}</td>
                  <td>{product?.price}</td>
                  <td>{product?.quantity}</td>
                  <td>
                    <div className="actions">
                      <button
                        className="actions-buttons"
                        onClick={() => handleEditInventory(product.id)}
                      >
                        <FiEdit />
                      </button>
                      <button
                        className="actions-buttons"
                        onClick={() => handleDeleteInventory(product)}
                      >
                        <FiDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (        
      <CreateProductModal
          company={nit}
          updateList={() => fetchInventory()}
          show={showModal}
          onHide={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default EnterpriseInventory;
