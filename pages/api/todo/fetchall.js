const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const notes = require('../../../models/notes');
const user = require('../../../models/user');

const connectToMongo = require('../../../mongoconnect');

export default async function handler(req, res) {
    await connectToMongo();
    const token = req.headers.authtoken;


    return res.json({ name: 'John Doe' });
}