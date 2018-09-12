//next is a function we call when middleware is finished. e.g middleware #2
module.exports = (req, res, next) =>{
    if(!req.user){
        return res.status(401).send({error: 'You must log in!'});
    }

    //proceed to next middleware,etc
    next();
};