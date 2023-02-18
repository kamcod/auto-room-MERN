const express = require('express')
const router = express.Router()


const {getDashboardStats, getAllCars, addCar, getCar, editCar, deleteCar} = require('../controllers/jobs')


router.route('/dashboard').get(getDashboardStats)
router.route('/car').get(getAllCars).post(addCar)
router.route('/car/:id').get(getCar).patch(editCar).delete(deleteCar)

module.exports = router
