const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "notes"
    },
    main : {
        type: String,
        required: true
    },
    timestamp : {
        type: Date,
        default: Date.now
        
    }
});

module.exports = mongoose.models.notes || mongoose.model('notes' , NotesSchema);