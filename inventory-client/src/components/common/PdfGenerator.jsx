import React from "react";
import jsPDF from "jspdf";

function InventoryPDF({ inventory }) {
  const generatePDF = () => {
    // Creamos un nuevo documento PDF
    const doc = new jsPDF();

    // Agregamos el título al documento
    doc.setFontSize(20);
    doc.text("Inventario de la empresa", 15, 15);

    // Agregamos una línea para separar el título del contenido
    doc.setLineWidth(0.5);
    doc.line(15, 25, 195, 25);

    // Agregamos el contenido del inventario
    let y = 35;
    inventory.forEach((item) => {
      doc.text(`Nombre: ${item.name}`, 15, y);
      doc.text(`Descripción: ${item.description}`, 15, y + 10);
      doc.text(`Cantidad: ${item.quantity}`, 15, y + 20);
      doc.text(`Precio: ${item.price}`, 15, y + 30);

      y += 50;
    });

    // Guardamos el documento como un archivo PDF
    doc.save("inventario.pdf");
  };

  return (
    <div>
      <button onClick={generatePDF}>Generar PDF</button>
    </div>
  );
}

export default InventoryPDF;
