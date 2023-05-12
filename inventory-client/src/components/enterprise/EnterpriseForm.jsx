import React, { useState } from "react";
import companyService from "../../service/CompanyService";

const companyServices = companyService()

const Input = ({ label, name, value, type, onChange, error }) => {
  return (
    <label>
      {label}:
      <input type={type} name={name} value={value} onChange={onChange} />
      {error && <span className="error">{error}</span>}
    </label>
  );
};

const EnterpriseForm = () => {
  const initialState = {
    nit: "",
    name: "",
    address: "",
    phone: "",
  };

  const [formValues, setFormValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [responseError, serResponseError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    const nitRegex = /^[0-9]{9}-[0-9]{1}$/;
    const phoneRegex = /^3[\d]{9}$/;

    let newErrors = {};

    if (!nitRegex.test(formValues.nit)) {
      newErrors.nit = "El NIT no es válido.";
    }

    if (!phoneRegex.test(formValues.phone)) {
      newErrors.phone = "El número de teléfono no es válido.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      companyServices.createCompany(
        formValues.nit,
        formValues.name,
        formValues.address,
        formValues.phone
      )
        .then((company) => {
          setFormValues(initialState);
          serResponseError(company);
          // Aquí puedes hacer algo con el objeto de empresa que se ha creado, como mostrar una alerta o redirigir al usuario a otra página.
        })
        .catch((error) => {
          console.error("Error al crear empresa:", error);
          // Aquí puedes hacer algo con el mensaje de error que se ha devuelto, como mostrar una alerta o un mensaje de error en el formulario.
        });
    }
  };

  const handleChange = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  return (
    <form className="form-enterprise" onSubmit={handleSubmit}>
      <Input
        label="Enterprise Name"
        name="name"
        type="text"
        value={formValues.name}
        onChange={(event) => handleChange("name", event.target.value)}
      />
      <br />
      <Input
        label="Address"
        name="address"
        type="text"
        value={formValues.address}
        onChange={(event) => handleChange("address", event.target.value)}
      />
      <br />
      <Input
        label="NIT"
        name="nit"
        type="text"
        value={formValues.nit}
        onChange={(event) => handleChange("nit", event.target.value)}
        error={errors.nit}
      />
      <br />
      <Input
        label="Phone"
        name="phone"
        type="text"
        value={formValues.phone}
        onChange={(event) => handleChange("phone", event.target.value)}
      />
      <br />
      <button type="submit">Registrar</button>
      <p>{responseError}</p>
    </form>
  );
};

export default EnterpriseForm;
