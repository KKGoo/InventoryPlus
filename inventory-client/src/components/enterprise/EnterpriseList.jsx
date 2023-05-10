import React, { useState, useEffect} from "react";
import companyService from "../../service/CompanyService";


const companyServices = companyService()

function EnterpriseList({user}) {

  const isAdmin = user?.isAdmin;
  const [companies, setCompanies] = useState([]);


  useEffect(() => {
    companyServices.getCompanies().then((response) => {
      console.log(response)
      setCompanies(response);
    });
  }, []);
  
  const handleEditEnterprise = (company) => {
    console.log(`Edit enterprise with ID ${company.nit}`);
  };

  const handleDeleteEnterprise = (company) => {
    companyServices.deleteCompany(company)
    console.log(`Delete enterprise with ID ${company.nit}`);
  };

  return (
    <div className="enterprise-list-container">
      <h1>Enterprises</h1>
      <ul>
        {companies.map((company) => (
          <li key={company?.nit}>
            <h2>{company?.name}</h2>
            <p>Address: {company?.address}</p>
            <p>NIT: {company?.nit}</p>
            <p>Phone: {company?.phone}</p>
              <div>
                <button onClick={() => handleEditEnterprise(company)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteEnterprise(company?.nit)}>
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