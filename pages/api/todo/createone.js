const { fetchUserDetails } = require("../../../context/detail");
const notes = require("../../../models/notes");

export default async function handler(req, res) {
    const { msg } = req.body;
    const token = req.headers.authtoken;

    const data = await fetchUserDetails(token);
    if (!data.success || msg == ""){
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }
    const userId = data.details.id;
    const note = new notes({main : msg , user : userId});
    const savenote = await note.save();
    return res.status(200).json({success : true , savenote});
}