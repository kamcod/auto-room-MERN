const mongoose = require('mongoose')
const {badRequestError} = require('../../errors/index');


const carSchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, "Please provide any category"],
    },
    make: {
        type: String,
        required: [true, "Please provide any value"],
        minLength: 3,
        maxLength: 50,
    },
    registration_no: {
        type: String,
        required: [true, "Please provide registration number"],
        minLength: [8, "Please enter minimum 8 characters"],
    },
    model: {
        type: Number,
        required: [true, "Please provide model number"],
        minLength: [4, "Please enter minimum 4 characters"],
        maxLength: 4,
    },
    color: {
        required: [true, "Please provide any color"],
        type: String,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    }

}, {timestamps: true});


carSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        next( new badRequestError("This account already exists"));
    }
    else {
        next( new badRequestError(error.name));
    }
});


module.exports = mongoose.model('Cars', carSchema)
