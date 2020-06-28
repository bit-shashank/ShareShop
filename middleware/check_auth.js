const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        //Getting the token from request headers
        const token=req.header('authorization');
        if (token) {
            // If token exists simply verify it
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.userData = decodedToken;
            //Pass on the request to the next controller
            next();
        }
        else {
            handleError(res);
        }
    }
    catch (error) {
        handleError(res);
    }
};



function handleError(res) {
    return res.status(403).json({
        "message":"Authentication Failed"
    })
}