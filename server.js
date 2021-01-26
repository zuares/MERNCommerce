const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('cookie-parser');
const upload = require('express-fileupload');
dotenv.config();

// Routes
const authRouter = require('./routes/authRouter');
const categoryRouter = require('./routes/categoryRouter');
const uploadRoutes = require('./routes/uploadRoutes');
const productRouter = require('./routes/productRouter');

const app = express();

app.use(express.json());
app.use(bodyParser());
app.use(cors());
app.use(upload({ useTempFiles: true }));

const URI = process.env.MONGO_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
},
    err => {
        if (err) throw err;
        console.log(`Connected to mongo`);
    }
)

// Router
app.get('/', (req, res) => {
    res.json("oke");
})

// Auth
app.use('/auth', authRouter);
app.use('/api/category', categoryRouter);
app.use('/api/upload', uploadRoutes);
app.use('/api/products', productRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running with port ${PORT}`));