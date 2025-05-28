const app = require('./app');
const sequelize = require('./models/db');


const Moneda = require('./models/moneda.models');
const Criptomoneda = require('./models/criptomoneda.models');

// historico
const MonedaHistory = require('./models/moneda.history');
const CriptomonedaHistory = require('./models/criptomoneda.history');

// Mi cron 
const startCron = require('./services/service.cron');
startCron(); // Esto activa el cron al arrancar el servidor

// Relaciones de las tablas de Monedas - cree una misma tabla para las M2M
Moneda.belongsToMany(Criptomoneda, { through: 'CriptoMonedasMonedas' });
Criptomoneda.belongsToMany(Moneda, { through: 'CriptoMonedasMonedas' });

sequelize.sync({ force: false }) // force: true solo en desarrollo 
  .then(() => {
    console.log('Conectado a PostgreSQL y modelos sincronizados');
  })
  .catch(console.error);


var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Servidor corriendo en el puerto ' + listener.address().port);
});
