import mongoose from 'mongoose';

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    jurusan: {
      type: String,
      required: true,
    },
    nim: {
      type: String,
      required: true,
    },
    nama: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  })
);

export default User;
