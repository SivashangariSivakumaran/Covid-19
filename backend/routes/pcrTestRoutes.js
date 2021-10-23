const express = require('express');
const pcrTestController = require('../controllers/pcrTestController');
const authController = require('./../controllers/authController')

const router = express.Router();

router
  .route('/')
  // .get(authController.protect, authController.restrictTo('hospitalAdmin'), pcrTestController.getAllTest)
  .post(authController.protect, authController.restrictTo('hospitalAdmin'),pcrTestController.createPCRTest)

router
  .route('/confirm')
  .post(authController.protect, authController.restrictTo('hospitalAdmin'), pcrTestController.confirmPCRTest)
router
  // .route('/:id')
//   .get(patientController.getPatient)
//   .patch(patientController.updatePatient)
//   .delete(patientController.deletePatient)

module.exports = router;