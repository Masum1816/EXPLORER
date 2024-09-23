
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const router = require('./Routers/Index');
const multer = require('./Config/fileUpload');
const PORT = 3003;

mongoose.connect('mongodb+srv://masummangukiya1816:5K3e5juevrIno9Ph@masum.j7rm2.mongodb.net/').then(() => {
    console.log("MongoDb Connected");
}).catch((err) => {
    console.log("ERROR : ", err);
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, '/public')));
app.use('/uploadFile', express.static(path.join(__dirname, 'uploadFile')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use('/', router);

app.listen(PORT, (error) => {

    if(!error){
        console.log(`Server running on http://localhost:${PORT}`);
    }

})









