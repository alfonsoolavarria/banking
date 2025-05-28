require('dotenv').config();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.loginUser = async (req, res) => {
    console.log("---loginUser---",process.env.JWT_SECRET)
    try {
      const { email, password } = req.body;

      const user = await User.findOne({where: { email:email }});
      
      if (!user) return res.status(404).json({ message: 'El usuario no existe' });

      const match = await bcrypt.compare(password, user.password);

      if (!match) return res.status(401).json({ message: 'Verifique las credenciales' });

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });

      res.json({ token });

    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error Intente de nuevo' });
    }
    
  };

  exports.createUser = async (req, res) => {
    console.log("---createUser---");
    try {
      const { email, password } = req.body;
      
      const userExist = await User.findOne({where: { email:email }});

      if (userExist) return res.status(400).json({ message: 'El usuario ya existe' });

      const hashedPassword = await bcrypt.hash(password, 10); //hasheo la clave

      const user = new User({ email, password: hashedPassword });
      
      await user.save();

      res.status(201).json({ message: 'Usuario creado',userId: user._id});

    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error al crear usuario, intente de nuevo' });
    }
  };