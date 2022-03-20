const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../../../models/user');

const connectToMongo = require('../../../mongoconnect');
const JWT_key = process.env.JWT_INFO;

export default async function handler(req, res) {
    let success = false;
    if (req.method !== 'POST') {return res.status(500).json({success , error :"Internal Server try after some time : method Problem"});}

    try {
        await connectToMongo();
        const userEmail = await user.findOne({ email: req.body.email });
        const userusername = await user.findOne({ username: req.body.username });

        if (userEmail) {
            success = false;
            return res.status(400).json({ success, error: "user with samee email id already Registered" });
        }
        if (userusername) {
            success = false;
            return res.status(400).json({ success, error: "user with samee username already Registered" });
        }

        const salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hashSync(req.body.password, salt);

        const createuser = await user.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: secPass,
        });

        const data = {
            user: {
                id: createuser.id,
                name : createuser.name,
                username : createuser.username,
                date : Date.now(),
            }
        };

        const authtoken = jwt.sign(data, JWT_key);
        success = true;
        return res.status(200).json({ success, authtoken });
    } catch (error) {
        success = false;
        return res.status(500).json({success , error :"Internal Server try after some time"});
    }
}