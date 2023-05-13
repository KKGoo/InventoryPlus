import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import inventoryService from "../service/InventoryService";
import { FiEdit, FiDelete, FiFilePlus } from "react-icons/fi";
import ModalInventory from "../components/common/modal";
import Header from "../components/common/Header";
const inventoryServices = inventoryService();

function EnterpriseInventory() {
  const { nit } = useParams(); // Obtener el parámetro de la ruta dinámica
  const [inventory, setInventory] = useState([]);
  const [editingCompany, setEditingCompany] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [company, setCompany] = useState(nit);
  const [id, setId] = useState(12333);
  const [name, setName] = useState("holawsS");
  const [price, setPrice] = useState(21312222);
  const [quantity, setQuantity] = useState(123322143);
  console.log(nit);

    useEffect(() => {
      const fetchInventory = async () => {
        try {
          const response = await inventoryServices.getInventoryItems(nit);
          console.log(response)
          setInventory(response);
        } catch (error) {
          console.error(error);
        }
      };
      fetchInventory();
    }, [nit]);

  /*   const handleDeleteInventory = async (companyNit) => {
    try {
      // await companyServices.deleteCompany(companyNit);
      //setCompanies(prevCompanies => prevCompanies.filter(c => c.nit !== companyNit));
      console.log(`Delete enterprise with ID ${companyNit}`);
    } catch (error) {
      console.error(error);
    }
  };
    setShowModal(true);
 */
  const handleCreateInventory = async () => {
    const response = await inventoryServices.createInventoryItem(
      id,
      nit,
      name,
      quantity,
      price
    );
    console.log(response);
  };

  //setShowModal(true);

  /*   const handleEditInventory = (company) => {
    //setEditingCompany(company);
    //setShowModal(true);
  }; */

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
                  <button
                    className="actions-buttons"
                    onClick={handleCreateInventory}
                  >
                    <FiFilePlus />
                  </button>
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
                  {/* <td>
                <div className="actions">
                  <button
                    className="actions-buttons"
                    onClick={() => handleEditInventory(product)}
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
              </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      

        {editingCompany && (
          <ModalInventory
            company={company}
            updateList={() => setEditingCompany(null)}
            show={true}
            onHide={() => setShowModal(false)}
          />
        )}
      </div>
    </>
  );
}

export default EnterpriseInventory;
