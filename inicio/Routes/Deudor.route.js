const express = require ("express");
const router = express.Router();


const DeudorController = require ("../Controller/Deudor.Controller");
const Deudor = require('../Models/Deudor.model');

router.get('/', DeudorController.getAllDeudor);
router.post('/', DeudorController.createNewDeudor);

router.get('/:id', DeudorController.findDeudroByid );
router.patch('/:id', DeudorController.updateDeudor );
router.delete('/:id',DeudorController.deleteDeudor);

module.exports = router;