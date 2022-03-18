const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const user = require('../../../../models/user');

const connectToMongo = require('../../../../mongoconnect');
const JWT_key = process.env.JWT_INFO;

export default async function handler(req, res) {
    let success = false;
    const { username } = req.query;

    if (req.method !== 'PUT') { return res.status(500).json({ success, error: "Internal Server try after some time : method Problem" }); }

    try {
        await connectToMongo();
        const UserDetails = await user.findOne({ username });

        success = true;
        if (UserDetails) {
            return res.json({ success, "res": true });
        }
        else {
            return res.json({ success, "res": false });
        }

    } catch (error) {
        success = false;
        return res.status(500).json({ success, error: "Some Error" });
    }
}