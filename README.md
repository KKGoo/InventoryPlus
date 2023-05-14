# InventoryPlus

InventoryPlus is a web app intended for inventory management. It allows to create, modify, edit or delete companies and
their inventories. It also keeps track of existing stock.

## Index

### [Client Docs](inventory-client/README.md)
### [Server Docs](inventory-server/README.md)

## Getting started

```shell
# Build Docker images
make build-images

# Start the project
make start

# Stop the project after you're done
make stop
```

## Tuning up

Modify the `podman-compose.yml` and `Makefile` to suit your needs.

## Development

Check `inventory-client/` and `inventory-server` for the client and server implementations. Instructions to run both are
found inside their respective README.md file.

## Requirements

- A web domain and hosting (for a production deployment)
- Podman (or Docker)
- podman-compose (or docker-compose)
- make
- Node LTS
- Linux (preferably), or PowerShell

### Add a company

To add a company, follow these steps:

1. Click on "Agregar empresa".
2. Fill the form with the company data.
3. Click on "Guardar".

### Edit a company

To modify a company, follow these steps:

1. Click on "Editar" over the company you wish to edit.
2. Modify the company data as needed.
3. Click on "Guardar".

### Delete a company

To delete a company, follow these steps:

1. Click on "Eliminar" over the company you wish to edit.
2. Confirm the delete action on the pop-up dialog.

## Used technologies

The app has been built with the following technologies:

- Podman
- React.js
- CSS
- Node.js
- SQLite
- Sequelize
- Koa.js

## Authors

- Santiago Leon Garzon 

## License

The app has been licensed under MIT license. See LICENSE.md for details.
