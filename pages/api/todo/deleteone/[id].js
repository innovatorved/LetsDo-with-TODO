const { fetchUserDetails } = require("../../../../context/detail");
const notes = require("../../../../models/notes");

export default async function handler(req, res) {
    if (req.method !== 'DELETE') { return res.status(500).json({ success: false, error: "Internal Server try after some time : method Problem" }); }
    try {
        const token = req.headers.authtoken;
        const { id } = req.query;
        const data = await fetchUserDetails(token);
        if (!data.success) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        const noteID = id.toString();
        const userId = data.details.id;
        const delNote = await notes.findOneAndDelete({ _id: noteID, user: userId });
        return res.status(200).json({ success:true , msg : delNote });
    } catch (error) {
        return res.status(200).json({ success:false , msg : "note deleted" });
    }
}