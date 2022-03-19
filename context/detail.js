const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_INFO;
const connectToMongo = require('../mongoconnect');

exports.fetchUserDetails = async function (token){
    if (!token) {
        return ({success : false , details : null});
    }
    await connectToMongo();
    try {
        const userDetail = jwt.verify(token , JWT_KEY);
        return ({success : true, details : userDetail.user});
    } catch (error) {
        return ({success : false , details : null});
    }
}
