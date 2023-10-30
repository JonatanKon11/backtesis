const Deudor = require('../Models/Deudor.model');
const createError = require('http-errors');
const mongoose = require('mongoose');

module.exports = {
    getAllDeudor : async (req, res, next) => {
        try{
            const results = await Deudor.find({}, {__v: 0, _id: 0});
            res.send(results);
        }catch (error){
            console.log(error.message);
        }
    },

    createNewDeudor: async (req, res, next) =>{
        try{
            const deudor = new Deudor(req.body)
            const result = await deudor.save()
            res.send(result)
        } catch (error) {
          console.log(error.message);
          if (error.name === 'ValidationError') {
            next(createError(422, error.message));
            return;
          }
          next(error);
        }
    },

    findDeudroByid: async  (req, res, next) =>{ 
        const id = req.params.id;
        try{
          const deudor = await Deudor.findById(id);
          if(!deudor){
            throw createError(404, 'Deudor does not exist');
          }
          res.send(deudor);
        } catch (error) {
          console.log(error.message);
          if(error instanceof mongoose.CastError) {
            next(createError(400, 'invalid Deudor id'));
            return;
          }
          next(error);
        }
    },

    updateDeudor: async (req, res, next) =>{ 
        try {
          const id = req.params.id;
          const updates = req.body;
          const options = {new: true};
          
          const result = await Deudor.findByIdAndUpdate(id, updates, options);
          if (!result) {
            throw createError(404, 'Deoudor does not exist');
          }
          res.send(result);
        } catch (error) {
          console.log(error.message);
          if (error instanceof mongoose.CastError) {
            return next(createError(400, 'Invalid Deudor id'));
          } 
          next(error);
        }
    },

    deleteDeudor:  async (req, res, next) =>{ 
        const id = req.params.id;
        try {
          const result = await Deudor.findByIdAndDelete(id);
          console.send(result);
          if(!result){
            throw createError(404, 'Deudor does not exist');
          }  
        } catch (error) {
            console.log(error.message);
            if(error instanceof mongoose.CastError) {
              next(createError(400, 'invalid Deudor id'));
              return;
            }
            next(error);
        }
    }
};