import { secret } from '../config/auth.config.js';
import User from '../model/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const signup = (req, res) => {
  const user = new User({
    jurusan: req.body.jurusan,
    nim: req.body.nim,
    nama: req.body.nama,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      res.status(200).send({ message: 'User was registered successfully!' });
    }
  });
};

export const signin = (req, res) => {
  User.findOne({
    nim: req.body.nim,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: 'Invalid NIM!' });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!',
      });
    }

    var token = jwt.sign({ id: user.id }, secret, {
      expiresIn: 86400, // 24 hours
    });
    res.status(200).send({
      id: user._id,
      nim: user.nim,
      nama: user.nama,
      email: user.email,
      accessToken: token,
    });
  });
};
