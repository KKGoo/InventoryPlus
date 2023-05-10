import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import companyService from "../../service/CompanyService";

const companyServices = companyService();

function EditEnterpriseModal(props) {
  const [name, setName] = useState(props.company?.name);
  const [address, setAddress] = useState(props.company?.address);
  const [phone, setPhone] = useState(props.company?.phone);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await companyServices.updateCompany(
        props.company.nit,
        name,
        address,
        phone
      );
      props.updateList(); // actualizar la lista de empresas
      props.onHide(); // cerrar el modal
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Enterprise</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter enterprise name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter enterprise address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter enterprise phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditEnterpriseModal;
