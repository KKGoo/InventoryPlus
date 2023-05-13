import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import inventoryService from "../../service/InventoryService";

const inventoryServices = inventoryService();

function ModalInventory(props) {
  const [name, setName] = useState(props.company?.name);
  const [price, setPrice] = useState(props.company?.price);
  const [quantity, setQuantity] = useState(props.company?.quantity);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await inventoryServices.createInventoryItem(
        props.company,
        name,
        quantity,
        price
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

export default ModalInventory;
