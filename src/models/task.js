const mongoose = require('mongoose');
const {Schema} = mongoose;

const TaskSchema = new Schema({
    idEmpleado : {type: Number, required: true},
    Nombre :{type: String, required: true},
    Puesto :{type: String, required: true}

});

module.exports = mongoose.model('Task',TaskSchema);
