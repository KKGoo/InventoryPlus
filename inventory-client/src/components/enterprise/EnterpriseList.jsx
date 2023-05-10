import React, { useState, useEffect } from "react";
import companyService from "../../service/CompanyService";
import EditEnterpriseModal from "./EnterpriseEditModal";
const companyServices = companyService();

function EnterpriseList({ user }) {
  const isAdmin = user?.role;
  const [companies, setCompanies] = useState([]);
  const [editingCompany, setEditingCompany] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const updateList = async () => {
    try {
      companyServices.getCompanies().then((response) => {
        console.log(response);
        setCompanies(response);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    companyServices.getCompanies().then((response) => {
      console.log(response);
      setCompanies(response);
    });
    updateList();
  }, []);

  const handleClose = () => {
    setEditingCompany(null);
    setShowModal(false);
  };
  const handleEditEnterprise = (company) => {
    setEditingCompany(company);
    setShowModal(true);
    console.log(`Edit enterprise with ID ${company.nit}`);
  };

  const handleDeleteEnterprise = (company) => {
    companyServices.deleteCompany(company);
    console.log(`Delete enterprise with ID ${company.nit}`);
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
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company?.nit}>
              <td>{company?.name}</td>
              <td>{company?.address}</td>
              <td>{company?.nit}</td>
              <td>{company?.phone}</td>
              {isAdmin && (
                <td>
                  <button onClick={() => handleEditEnterprise(company)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteEnterprise(company?.nit)}>
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {editingCompany && (
        <EditEnterpriseModal
          company={editingCompany}
          updateList={updateList}
          show={showModal}
          onHide={handleClose}
        />
      )}
    </div>
  );
}

export default EnterpriseList;
