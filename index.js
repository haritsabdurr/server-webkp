import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { URL } from './src/config/db.config.js';
import authRouter from './src/routes/auth.routes.js';
import router from './src/routes/user.routes.js';

const app = express();
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => {
  console.log(error);
});
db.once('open', () => {
  console.log('Database connected successfully!');
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to server application.' });
});

app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
