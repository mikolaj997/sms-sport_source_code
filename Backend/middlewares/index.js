const ObjectedId = require('mongoose').Types.ObjectId

const validateDbId = (req, res, next) => {
    if (ObjectedId.isValid(req.params.id) == false)
        res.status(400).json({
            error: `given object id (${req.params.id}) is not valid.`
        }) 
        else
        next()
}
// const validateUsername = (req, res, next) => {
//     const { username } = req.params;
//     if (!username || typeof username !== 'string' || username.trim() === '') {
//       return res.status(400).send('Invalid username.');
//     }
//     next();
//   };

const raiseRecord404Error = (req, res) => {
    res.status(404).json({
        error: 'no record with given _id : ' + req.params.id
    })
}

const errorHandler = (error, req, res, next) => {
    res.status(500).json({ error })
}

module.exports = {
    validateDbId,
    // validateUsername,
    raiseRecord404Error,
    errorHandler
}