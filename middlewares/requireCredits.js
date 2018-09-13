//next is a function we call when middleware is finished. e.g middleware #2
module.exports = (req, res, next) =>{
    if(req.user.credits < 1 ){
        return res.status(403).send({error: 'Insufficient credits!'});
    }

    //proceed to next middleware,etc
    next();
};