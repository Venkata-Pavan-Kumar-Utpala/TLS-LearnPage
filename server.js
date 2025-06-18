import express, { json } from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';

config();
const app = express();
app.use(cors());
app.use(json());

import exerciseRoutes from './routes/exerciseRoutes';
app.use('/api/exercises', exerciseRoutes);

connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);
