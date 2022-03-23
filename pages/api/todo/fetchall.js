const { fetchUserDetails } = require("../../../context/detail");
const notes = require("../../../models/notes");

export default async function handler(req, res) {
    if (req.method !== 'GET') { return res.status(500).json({ success : false, error: "Internal Server try after some time : method Problem" }); }

    const token = req.headers.authtoken;
    const data = await fetchUserDetails(token);
    if (!data.success){
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    try {
        const userId = data.details.id;
        const note = await notes.find({user : userId} , {user : 0 , __v : 0});
        return res.status(200).json({success:true , note});
    } catch (error) {
        return res.status(400).json({success:false});
    }
}