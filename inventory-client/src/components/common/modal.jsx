import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import inventoryService from "../../service/InventoryService";

const inventoryServices = inventoryService();

function EditEnterpriseModal(props) {
  const [name, setName] = useState();
  const [quantity, setQuantity] = useState();
  const [description, setDescription] = useState();
  const [id, setId] = useState();
  const [price, setPrice] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await inventoryServices.createInventoryItem(
      id,
      name,
      description,
      price,
      quantity,
      props.company
    );
    console.log(response);
    props.updateList(); // actualizar la lista de empresas
    props.onHide(); // cerrar el modal
  };

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Enterprise</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>id</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter enterprise id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </Form.Group>
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
            <Form.Label>description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter enterprise description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter enterprise price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>quantity</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter enterprise quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
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
