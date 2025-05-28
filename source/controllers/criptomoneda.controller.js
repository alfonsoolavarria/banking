const Moneda = require('../models/moneda.models');
const Criptomoneda = require('../models/criptomoneda.models');

exports.getAllCriptos = async (req, res) => {
    try {
        const monedaQuery = req.query.moneda; // ?moneda=XYZ
        console.log("monedaQuery",monedaQuery)
        let criptos;
    
        if (monedaQuery) {
            // Buscar monedas que coincidentes
            criptos = await Criptomoneda.findAll({
                include: {
                    model: Moneda,
                    where: {
                        simbolo: monedaQuery 
                    }
                }
            });
        } else {
            // Mando todas 
            criptos = await Criptomoneda.findAll({
            include: Moneda
            });
        }
    
        res.json(criptos);
  
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener criptomonedas' });
    }
  };

exports.createCripto = async (req, res) => {
  try {
    const { nombre, sigla, monedaIds } = req.body;
    
    const verified_coin = await Criptomoneda.findOne({where: { sigla:sigla }});
      
    if (verified_coin) return res.status(404).json({ message: 'La Criptomoneda ya existe' });
    
    if (!monedaIds) return res.status(404).json({ message: 'La moneda es necesaria' });

    const nueva = await Criptomoneda.create({ nombre, sigla });
    
    if (monedaIds && monedaIds.length > 0) {
      await nueva.addMoneda(monedaIds);
    }

    res.status(201).json(nueva);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Error al crear criptomoneda' });
  }
};

exports.updateCripto = async (req, res) => {
  try {
        const { id } = req.params;
        const { nombre, sigla } = req.body;
        const cripto = await Criptomoneda.findByPk(id);
        
        if (!cripto) return res.status(404).json({ error: 'No encontrada' });

        cripto.nombre = nombre ?? cripto.nombre;
        cripto.sigla = sigla ?? cripto.sigla;
        await cripto.save();

        res.json(cripto);

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Error al actualizar criptomoneda' });
  }
};
