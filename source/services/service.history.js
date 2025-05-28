const Moneda = require('../models/moneda.models');
const Criptomoneda = require('../models/criptomoneda.models');
const MonedaHist = require('../models/moneda.history');
const CriptomonedaHist = require('../models/criptomoneda.history');
const { Op } = require('sequelize');

async function replicarHistoricoMonedas() {
  // Si hay especificaciones más detalladas u otras especificaciones a considerar para 
  // las tablas historicas se generan aqui

  //Ejemplo actual de historicos: Registros creados hace más de 30 días

  const fechaLimite = new Date();
  fechaLimite.setDate(fechaLimite.getDate() - 30);

  const monedas = await Moneda.findAll({
    where: {
      createdAt: {
        [Op.lt]: fechaLimite
      }
    }
  });

  for (const moneda of monedas) {
    await MonedaHist.create({
      id_original: moneda.id,
      nombre: moneda.nombre,
      simbolo: moneda.simbolo,
      archivado_fecha: new Date(),
    });
  }

  // Luego de archivar - Borrar los originales
  await Moneda.destroy({
    where: { id: monedas.map(m => m.id) }
  });
}

async function replicarHistoricoCriptomonedas() {
  const fechaLimite = new Date();
  fechaLimite.setDate(fechaLimite.getDate() - 30);

  const criptos = await Criptomoneda.findAll({
    where: {
      createdAt: {
        [Op.lt]: fechaLimite
      }
    }
  });

  for (const cripto of criptos) {
    await CriptomonedaHist.create({
      id_original: cripto.id,
      nombre: cripto.nombre,
      sigla: cripto.sigla,
      archivado_fecha: new Date(),
    });
  }

  await Criptomoneda.destroy({
    where: { id: criptos.map(c => c.id) }
  });
}

async function replicarHistorico() {
  await replicarHistoricoMonedas();
  await replicarHistoricoCriptomonedas();
}

module.exports = { replicarHistorico };
