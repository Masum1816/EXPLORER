
const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    name:{ 
        type: String, 
        required: true 
    },
    director:{ 
        type: String,
        required: true 
    },
    releaseDate :{ 
        type: Date,
        required: true
    },
    path:{
        type: String,
        required: true
    }
  }
)

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;








