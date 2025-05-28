Hola... Soy Alfonso Olavarria 🤓 
Te presento mi tree -I node_modules del proyecto...

# 💸 Banking API
-- CRUD DOC POSTMAN --
en esta url https://documenter.getpostman.com/view/355235/2sB2qf9JTA podrán ver cómo usar desde POSTMAN las url y los parametros necesarios para interactuar con 
el sistema...

## 🚀 Cómo ejecutar

```bash
npx nodemon source/index.js

# 💸 Banking API

API RESTful para gestión de usuarios, monedas y criptomonedas, con trazabilidad histórica y autenticación por JWT.

## 📁 Estructura del Proyecto

```
├── README.md
├── package-lock.json
├── package.json
└── source
    ├── app.js
    ├── index.js
    ├── controllers/
    ├── middlewares/
    ├── models/
    ├── routes/
    └── services/

7 directories, 20 files
```

---

## ✨ Cómo ejecutar el servidor

1. Instala dependencias:

```bash
npm install
```

2. Configura tu archivo `.env`:

```
PORT=3000
DATABASE_URL=postgres://usuario:clave@localhost:5432/basededatos
JWT_SECRET=miclavesecreta
```

3. Ejecuta el servidor:

```bash
npx nodemon source/index.js
```

---

## 🔐 Autenticación

> Todas las rutas protegidas requieren un token en el header:

```
Authorization: Bearer <token>
```

### POST `/api/user/auth/register`

* Crea un nuevo usuario.

```json
{
  "email": "test@example.com",
  "password": "12345678"
}
```

### POST `/api/user/auth/login`

* Devuelve un JWT válido.

```json
{
  "email": "test@example.com",
  "password": "12345678"
}
```

**Respuesta:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

---

## 💱 Endpoints de Moneda

### GET `/api/coin/moneda`

* Lista todas las monedas (requiere token).

### POST `/api/coin/moneda`

* Crea una nueva moneda.

```json
{
  "nombre": "Peso Chileno",
  "simbolo": "CLP"
}
```

---

## 💰 Endpoints de Criptomoneda

### GET `/api/coin/criptomoneda`

* Lista todas las criptomonedas y sus relaciones.

### GET `/api/coin/criptomoneda?moneda=USD`

* Lista criptomonedas asociadas a una moneda específica.

### POST `/api/coin/criptomoneda`

* Crea una criptomoneda y asóciala a monedas.

```json
{
  "nombre": "Bitcoin",
  "sigla": "BTC",
  "monedaIds": [1, 2]
}
```

### PUT `/api/coin/criptomoneda/:id`

* Actualiza una criptomoneda.

---

## ⏱️ Servicio Cron para Históricos

El microservicio `service.cron.js` copia registros de las tablas principales a sus versiones históricas y luego los elimina del sistema principal.

### 🕒 Ejecución automática

Actualmente configurado para ejecutarse **cada 1 minuto**:

```js
cron.schedule('* 1 * * * *', async () => {
  ...
});
```

> Puedes modificar este intervalo en `source/services/service.cron.js`.

---

## 🛠️ Tecnologías

* Node.js
* Express
* PostgreSQL (Sequelize ORM)
* JWT para autenticación
* `node-cron` para tareas programadas

---

## 📬 Colección Postman

> https://documenter.getpostman.com/view/355235/2sB2qf9JTA

---

## ---->>> Esquema de Base de Datos <---------
# Tablas principales

## User
- id (PK, auto incremental)
- email (string, único, no nulo)
- password (string, no nulo)
- createdAt (timestamp)
- updatedAt (timestamp)

## Moneda
- id (PK, auto incremental)
- nombre (string, no nulo)
- simbolo (string, no nulo)
- createdAt (timestamp)
- updatedAt (timestamp)

## Criptomoneda
- id (PK, auto incremental)
- nombre (string, no nulo)
- sigla (string, no nulo)
- createdAt (timestamp)
- updatedAt (timestamp)

# Tabla intermedia para relación muchos a muchos entre Moneda y Criptomoneda

## CriptoMonedasMonedas
- MonedaId (FK -> Moneda.id)
- CriptomonedaId (FK -> Criptomoneda.id)
- (PK compuesta por ambos)

# Tablas históricas

## MonedaHistory
- id (PK, auto incremental)
- id_original (integer, referencia al Moneda.id)
- nombre (string, no nulo)
- simbolo (string, no nulo)
- archivado_fecha (timestamp, default ahora)

## CriptomonedaHistory
- id (PK, auto incremental)
- id_original (integer, referencia al Criptomoneda.id)
- nombre (string, no nulo)
- sigla (string, no nulo)
- archivado_fecha (timestamp, default ahora)


## 🧑‍💻 Autor

**Alfonso Olavarria**
📧 [alfonsojn15@gmail.com](mailto:alfonsojn15@gmail.com)
🔗 [GitHub](https://github.com/aolavarria)
