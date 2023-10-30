const express = require("express");
const router = express.Router();


const PadronController = require("../Controller/Padron.Controller")

//get a list of all padron
router.get("/", PadronController.getAllPadron);
// create a new padron
router.post("/", PadronController.createNewPadron );
router.get("/:id", PadronController.findPadronById );
router.patch("/:id", PadronController.updateAPadron );
router.delete("/:id",PadronController.deleteAPadron );
module.exports = router;