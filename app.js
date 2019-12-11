import express from 'express';
// import db from './db';
import cors from 'cors';
import router from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);



const PORT = 5000

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})