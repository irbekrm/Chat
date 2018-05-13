exports.main = (req, res) => res.status(200).send({ location: 'chats/mainVerified' }); 


exports.mainVerified = (req, res) => res.render('main');
