const express = require('express');
const router = express.Router();

const Task = require('../models/task');

router.get('/', async (req,res)=> {
    const tasks = await Task.find();
    res.json(tasks);
});

router.get('/:id', async (req,res)=>{
    const tasks = await Task.findById(req.params.id);
    res.json(tasks);
});

router.post('/', async (req,res)=>{
    const tasks2 = await Task.find();
    const {Nombre,Puesto} = req.body;
    //console.log(tasks2[1].idEmpleado);

    if(tasks2.length==0){
          contador = 1;
    }else{
          contador = tasks2[tasks2.length-1].idEmpleado+1;
    }
    
    const task = new Task({
        idEmpleado:contador, Nombre, Puesto
    });
    await task.save();
    res.json({status: 'Empleado Guardado'});
});

router.put('/:id', async(req,res)=>{
    const {Nombre,Puesto} = req.body;
    const newTask = {Nombre,Puesto};
    await Task.findByIdAndUpdate(req.params.id,newTask);
    res.json({status:'Actualizado'});
});

router.delete('/:id', async (req,res)=>{
    await Task.findByIdAndDelete(req.params.id);
    res.json({status:'Eliminado'});
})

module.exports= router;