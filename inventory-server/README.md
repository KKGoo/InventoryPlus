# Inventory Server

Koa.js powered backend for the InventoryPlus project.

## Running

```
npm install
npm run server
```

## Authentication

Authentication is cookie based. Users keep a session id related to their session in database.

- `koa.sid` = ID of the current user session
- `koa.sid.sig` = Crypto key for decoding purposes.

Both cookies must be present in requests made to protected endpoints.

## API Models

External representations of the database models contained within the project.

### User

Fields:
- `username` = string
- `password` = string

### Company

Fields:
- `NIT` = string, pk, unique
- `name` = string
- `address` = string
- `phone` = string

## API Endpoints

Runs in port 3000.

All endpoints return 400 if parameters are invalid. The reason is returned as a string.

### Auth

Uses model: User

- `POST /login` = Provides a login mechanism to the user. Expects request body to be `{ "username": string, "password": string}`.
If user is already logged in, status code `201` is returned. If login is successful, status code `200` is returned.
- `POST /register` = Provides registration to the user. Expects request body to be the same as `/login` endpoint. Status
code `200` is returned if creation was successful. After registration, user has to log in.
- `GET /logout` = Logs the current user out by deleting the session, and the user cookies. Returns `200` if logout was
successful.

### Company

Uses model: Company

- `GET /company/:nit` = Authentication required. Gets a single instance of a company, by the NIT. Returned item is a list
of one item, or an empty list if nothing was found. Returns `200` status code unconditionally.
- `GET /company` = Authentication required. Gets all instances of companies. Returned item is a list. 
Returns `200` status code unconditionally.
- `POST /company` = Authentication and admin role required. Creates a company instance. All fields are expected to be
present in the request body. Returns `200` on creation.
- `PUT /company` = Authentication and admin role required. Updates a company instance. All fields are expected to be
present in the request body. Returns `200` on update.
- `DELETE /company/:nit` = Authentication and admin role required. Deletes a company instance by NIT. Returns `200`
if deletion was successful.