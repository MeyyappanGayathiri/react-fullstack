const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://nepo:test1234@cluster0.vojfk.mongodb.net/')
.then(()=>console.log('db connection successful....')).catch(error=> console.log(`error occured: ${error}`))