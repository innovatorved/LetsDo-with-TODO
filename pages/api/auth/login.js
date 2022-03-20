const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../../../models/user');

const connectToMongo = require('../../../mongoconnect');
const JWT_key = process.env.JWT_INFO;

export default async function handler(req, res) {
    let success = false;
    if (req.method !== 'POST') { return res.status(500).json({ success, error: "Internal Server try after some time : method Problem" }); }

    try {
        await connectToMongo();
        const {email , password} = req.body;
        const userDetails = await user.findOne({ email  });

        if (!userDetails) {
            success = false;
            return res.status(400).json({ success, error: "EmailId not Registered" });
        }

        const passwordCompare = await bcrypt.compare(password, userDetails.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with Correct Credentials" });
        }
        const data = {
            user: {
                id: userDetails.id,
                name : userDetails.name,
                username : userDetails.username,
                date : Date.now(),
            }
        };

        const authtoken = jwt.sign(data, JWT_key);
        success = true;
        return res.json({ success, authtoken , userDetails});

    } catch (error) {
        success = false;
        return res.status(500).json({ success, error: "Internal Server try after some time" });
    }
}