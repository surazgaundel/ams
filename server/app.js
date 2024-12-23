require("dotenv").config();
const mongoose = require("mongoose");
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');


const app = express();


//different routes and controller
const userRoutes = require('./routes/userRoute');
const artistRoutes = require('./routes/artistRoute');
const musicRoutes = require('./routes/musicRoute');
const logout = require('./routes/logOut');
const authRoute = require('./routes/authRoute');

const verifyJWT = require('./middleware/verifyJWT');
mongoose.set('strictQuery',true);




// middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//mongodb connection
mongoose.connect(process.env.DB_CONNECT_URL)
.then(()=>console.log('DB Connected'))
.catch(err=>console.error('Error',err))


app.use("/auth", authRoute);

app.get('/',(req, res) => {
    res.redirect('/auth/login');
})

//routes
app.use('/users', verifyJWT, userRoutes);
app.use('/artists', verifyJWT, artistRoutes);
app.use('/musics', verifyJWT, musicRoutes);

//logout
app.post('/logout',logout);




const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`app listening in port:${PORT}`),)