const createError = require("http-errors");
const mongoose = require("mongoose");
const Padron = require('../Models/Padron.model');

module.exports = {

    getAllPadron: async (req, res, next) =>{
        try {
            const result = await Padron.find({}, {__v: 0, _id:0 });
            res.send(result);
        } catch (error){
            console.log(error.message);
        }
    },
    
    createNewPadron: async (req, res, next) => {

        try{
          const padron = new Padron(req.body);
          const result = await padron.save()
          res.send(result)
        } catch (error) {
          console.log(error.message);
          if (error.name === 'ValidationError') {
            next(createError(422, error.message));
            return;
          }
          next (error);
        }
    },

    findPadronById: async (req, res, next) =>{
        const id = req.params.id;
        try{
            const padron = await Padron.findById(id);
            if (!padron) {
                throw createError (404, "No pertenece al padron");
            }
            res.send(padron);
        } catch(error) {
          console.log(error.message);
          if (error instanceof mongoose.CastError) {
                next(createError(400, "invalid Padron id"))
                return;
            }
            next(error); 
        }      
    },

    updateAPadron : async (req, res, next) =>{ 
        try{
         const id = req.params.id;
         const updates = req.body;
         const options = { new: true };
         const result = await Padron.findByIdAndUpdate(id,updates, options);
         if (!result) {
            throw createError(404, "Padron does not exist");
         }
         res.send(result);
        }catch(error){
          console.log(error.message);
          if (error instanceof mongoose.CastError){
            return next (createError(400, "invalid Padron Id"))
          }  
          next(error)
        }
        res.send("updating usuario al padron");
    },

    deleteAPadron: async (req, res, next) =>{
        const id = req.params.id
        try {
            const result = await Padron.findByIdAndDelete(id);
            console.log(result);
            if (!result) {
                throw createError (404, "No pertenece al padron");
            }
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, "invalid Padron id"))
                return;
            }
            next(error);
        }    
    }
};