import express from 'express';
import logger from './middleware/logger.js';
import errorHandler from './middleware/error.js';
import notFound from './middleware/notFound.js';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import cors from 'cors';

// Import routes
import auth from './routes/authRoute.js';
import users from './routes/usersRoute.js';
import stocks from './routes/stockRoute.js';
import productCategories from './routes/productCategoryRoute.js';
import products from './routes/productRoute.js';
import outlets from './routes/outletRoute.js';
import operator from './routes/operatorRoute.js';

const port = process.env.PORT || 8001;
const app = express();

// MongoDB connection
mongoose.connect(process.env.DATABASE_URL);

// Check if the connection was successful
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB', new Date().toLocaleString());
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Body parser middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({limit: '50mb', extended: true }));

// Logger middleware
app.use(logger);

// Enable CORS for all origins in this example.
// In a production environment, you should restrict this.
// Configure CORS to allow requests from your Firebase Hosting domain
const corsOptions = {
  origin: 'https://project428app.web.app', // Replace with your actual Firebase Hosting domain
  // You might also need to include your custom domain if you're using one for Firebase Hosting
  // e.g., origin: ['https://YOUR_FIREBASE_HOSTING_DOMAIN.web.app', 'https://your-custom-firebase-domain.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};
app.use(cors());

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

app.use(upload.single('image'));

// Routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/stocks', stocks);
app.use('/api/v1/product-categories', productCategories);
app.use('/api/v1/products', products);
app.use('/api/v1/outlets', outlets);
app.use('/api/v1/operator', operator);

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