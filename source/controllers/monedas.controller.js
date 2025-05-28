const Moneda = require('../models/moneda.models');

exports.getAllMonedas = async (req, res) => {
  try {
    const monedas = await Moneda.findAll();
    res.json(monedas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener monedas' });
  }
};

exports.createMoneda = async (req, res) => {
  try {
    const { nombre, simbolo } = req.body;
    
    const verified_coin = await Moneda.findOne({where: { simbolo:simbolo }});
      
    if (verified_coin) return res.status(404).json({ message: 'La moneda ya existe' });
    
    const nueva = await Moneda.create({ nombre, simbolo });
    res.status(201).json(nueva);

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Error al crear moneda' });
  }
};
