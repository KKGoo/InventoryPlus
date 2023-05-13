import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import companyService from "../../service/CompanyService";
import EditEnterpriseModal from "./EnterpriseEditModal";
import { FiEdit, FiDelete, FiEye } from 'react-icons/fi';

const companyServices = companyService();

function EnterpriseList({ user }) {
  const isAdmin = user?.role;
  const [companies, setCompanies] = useState([]);
  const [editingCompany, setEditingCompany] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await companyServices.getCompanies();
        setCompanies(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCompanies();
  }, []);

  const handleEditEnterprise = (company) => {
    setEditingCompany(company);
    setShowModal(true);
    console.log(`Edit enterprise with ID ${company.nit}`);
  };
  
  const handleInventory = (company) => {
    navigate(`/inventory/${company}`);
  }

  const handleDeleteEnterprise = async (companyNit) => {
    try {
      await companyServices.deleteCompany(companyNit);
      setCompanies(prevCompanies => prevCompanies.filter(c => c.nit !== companyNit));
      console.log(`Delete enterprise with ID ${companyNit}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="enterprise-list-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>NIT</th>
            <th>Phone</th>
            {isAdmin === 0 && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company?.nit}>
              <td>
                <Link to={`/inventory/${company.nit}`}>{company?.name}</Link>
              </td>
              <td>{company?.address}</td>
              <td>{company?.nit}</td>
              <td>{company?.phone}</td>
              {isAdmin === 0 && (
                <td>
                  <div className="actions">
                    <button className="actions-buttons" onClick={() => handleEditEnterprise(company)}>
                      <FiEdit/>
                    </button>
                    <button className="actions-buttons" onClick={() => handleDeleteEnterprise(company?.nit)}>
                      <FiDelete/>
                    </button>
                    <button className="actions-buttons" onClick={() => handleInventory(company?.nit)}>
                    <FiEye/>
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {editingCompany && (
        <EditEnterpriseModal
          company={editingCompany}
          updateList={() => setEditingCompany(null)}
          show={showModal}
          onHide={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default EnterpriseList;
