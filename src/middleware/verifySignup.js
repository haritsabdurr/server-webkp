import User from '../model/user.model.js';

export const checkDuplicateNimOrEmail = (req, res, next) => {
  // nim
  User.findOne({
    nim: req.body.nim,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: 'Failed! NIM is already in use!' });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: 'Failed! Email is already in use!' });
        return;
      }

      next();
    });
  });
};
