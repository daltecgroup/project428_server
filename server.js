import express from 'express';
import logger from './middleware/logger.js';
import errorHandler from './middleware/error.js';
import notFound from './middleware/notFound.js';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import moment from 'moment-timezone'

// Import routes
import auth from './routes/authRoute.js';
import users from './routes/usersRoute.js';
import stocks from './routes/stockRoute.js';
import productCategories from './routes/productCategoryRoute.js';
import products from './routes/productRoute.js';
import outlets from './routes/outletRoute.js';
import operator from './routes/operatorRoute.js';
import sale from './routes/saleRoute.js';
import order from './routes/orderRoute.js';
import attendance from './routes/attendanceRoute.js';
import topping from './routes/toppingRoute.js';

moment.tz.setDefault('Asia/Jakarta');

const port = process.env.PORT || 8001;
const app = express();

const allowedOrigins = [
  'https://aromabisnisgroup.com',
  'https://project428app.web.app',
  'https://project428app.firebaseapp.com',
  'http://localhost:59056'
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    console.log('Incoming Origin:', origin);
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'HEAD', 'PUT', 'POST', 'OPTIONS', 'PATCH', 'DELETE'],
  // methods: 'GET,HEAD,PUT,POST,DELETE,OPTIONS,PATCH',
  allowedHeaders: 'Content-Type,Authorization',
  optionsSuccessStatus: 204
};

app.use(cors());

// Body parser middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({limit: '50mb', extended: true }));

// MongoDB connection
mongoose.connect(process.env.DATABASE_URL);

// Check if the connection was successful
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB', new Date().toLocaleString());
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory to save the uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E6)}`;
    const fileExtension = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${fileExtension}`); // Generate a unique filename
  },
});

const upload = multer({ storage });
app.use(upload.single('image'));

// Route to handle image file upload
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No image file uploaded.');
  }
  // `req.file` contains information about the uploaded file
  console.log('Uploaded file:', req.file);
  // You can save the file path or other relevant information to a database here
  const imageUrl = `/uploads/${req.file.filename}`; // Construct the URL to access the image
  res.status(200).json({ message: 'Image uploaded successfully!', imageUrl: imageUrl });
});

// Logger middleware
app.use(logger);

// Routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/stocks', stocks);
app.use('/api/v1/product-categories', productCategories);
app.use('/api/v1/products', products);
app.use('/api/v1/outlets', outlets);
app.use('/api/v1/operator', operator);
app.use('/api/v1/sales', sale);
app.use('/api/v1/orders', order);
app.use('/api/v1/attendances', attendance);
app.use('/api/v1/toppings', topping);

// Serve static files from the 'uploads' directory (for later retrieval)
app.use('/api/v1/uploads', express.static('uploads'));

// Health check route
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ message: 'Server is healthy!' });
});

// Error handler
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`); 
});