const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const purchaseSchema = mongoose.Schema({

    userId: ObjectId,
    courseId: ObjectId,
    amount: Number,
    purchaseDate: Date,
    status: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const puchaseModel = mongoose.model('Purchase', purchaseSchema);

module.exports = {
    puchaseModel: puchaseModel
};