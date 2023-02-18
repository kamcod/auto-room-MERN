const {badRequestError} = require('../errors/index');
const {StatusCodes} = require('http-status-codes')
const User = require('../db/model/user');
const Cars = require('../db/model/cars')

const getDashboardStats = async (req, res) => {
    const {page} = req.query;
    const perPage = 5;
    const user = await User.findOne({_id: req.user.userId})
    const cars = await Cars.find({createdBy: req.user.userId})
        .skip(perPage * (page-1))
        .limit(perPage)
    const carsCount = await Cars.count()
    const totalPages = Math.ceil(carsCount / perPage)
    if(user){
        res.status(StatusCodes.OK).json({
            name: user.name,
            cars,
            pagination: {
                perPage,
                currentPage: page,
                totalPages
            }
        })
    } else {
        throw new badRequestError("User Not Found");
    }

};
const getAllCars = async (req, res) => {
    const user = await User.findOne({_id: req.user.userId})
    const cars = await Cars.find({createdBy: req.user.userId})
    if(user){
        res.status(StatusCodes.OK).json({name: user.name, cars})
    } else {
        throw new badRequestError("User Not Found");
    }
};

const addCar = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const car = await Cars.create({...req.body});
    res.status(StatusCodes.CREATED).json({ car_make: car})
};
const editCar = async (req, res) => {
    const {
        body: {make, model, registration_no, color},
        params: {id: dataId}
    } = req;
    if(make === '' || model === '' || registration_no === '' || color === ''){
        throw new badRequestError('Title and description can not be empty');
    }
    const car = await Cars.findByIdAndUpdate({_id: dataId},
        req.body, { new: true, runValidators: true });

    res.status(StatusCodes.OK).json({ status: "updated", car})
};
const getCar = async (req, res) => {
    const {id: postId} = req.params;
    const {userId} = req.user;
    const car = await Cars.findOne({
        _id: postId,
        createdBy: userId,
    });
    res.status(StatusCodes.OK).json({ car})
};
const deleteCar = async (req, res) => {
    const {id: postId} = req.params;
    const {userId} = req.user;
    const car = await Cars.findByIdAndRemove({
        _id: postId,
        createdBy: userId,
    });
    res.status(StatusCodes.OK).json({ status: "remove", car})
};

module.exports = {
    getDashboardStats,
    getAllCars,
    addCar,
    editCar,
    getCar,
    deleteCar
};
