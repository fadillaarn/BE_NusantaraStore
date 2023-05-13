import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './client/build')));

app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use("/api/product", productRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to Nusantara Store!');
    }
);

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
    }
);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    }
);