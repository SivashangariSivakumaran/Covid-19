const express = require('express');
const pcrTestController = require('../controllers/pcrTestController');
const authController = require('./../controllers/authController')

const router = express.Router();

router
  .route('/')
  .get(/*authController.protect,*/ pcrTestController.getAllTest)
  .post(pcrTestController.createPCRTest)

// router
//   .route('/:id')
//   .get(patientController.getPatient)
//   .patch(patientController.updatePatient)
//   .delete(patientController.deletePatient)

module.exports = router;