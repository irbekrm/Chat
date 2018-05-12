const jwt = require('jsonwebtoken'),
      bcrypt = require('bcrypt'),
      User = require('../models/user');

exports.signup = (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  User.create({ username: req.body.username, password: hashedPassword }, (err, user) => {
    if(err) {
      return res.status(500).send("There was a problem registering the user.");
    }
  
    const.token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: 86400 });
    
    res.status(200).send({ auth: true, token: token, name: user.username });
  });
}


