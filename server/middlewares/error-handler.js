
const errorHandler = async (err, req, res, next) => {
    if(err instanceof Error){
        return res.status(err.statusCode).json({message: err.message})
    }
    return res.status(500).json({success: false, msg: 'Something went wrong, please try again'})
}

module.exports = errorHandler
