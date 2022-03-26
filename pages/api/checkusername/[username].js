
const {nodeRedisGet} = require('../../lib/redisConnect')

export default async function handler(req, res) {
    
    return res.status(400).json({success : false});
}