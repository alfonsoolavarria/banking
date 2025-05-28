const cron = require('node-cron');
const sequelize = require('../models/db');
const { replicarHistorico } = require('./service.history');


// aqui podemos revisar la tabla del cron y modificar segun lo que se requiera
//https://www-npmjs-com.translate.goog/package/cron-schedule?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=sge#:~:text=Formato%20de%20expresi%C3%83%C2%B3n%20cron,campo%20al%20campo%20de%20minutos.&text=Para%20tareas%20de%20cronometraje%20simples,la%20sobrecarga%20de%20c%C3%83%C2%A1lculo.
/*
┌───────────── second (0 - 59, optional)
│ ┌───────────── minute (0 - 59)
│ │ ┌───────────── hour (0 - 23)
│ │ │ ┌───────────── day of month (1 - 31)
│ │ │ │ ┌───────────── month (1 - 12)
│ │ │ │ │ ┌───────────── weekday (0 - 7)
* * * * * *
*/
// Ejecutar cada día a la medianoche (puedes cambiar la frecuencia)

const startCron = () => {
    cron.schedule('* 1 * * * *', async () => {
      console.log('🔁 Ejecutando cron de replicación histórica');
      await replicarHistorico();
    });
  };


  module.exports = startCron;
