const { fetchUserDetails } = require("../../context/detail");

export default async function handler(req, res) {
    const token = req.headers.authtoken;
    const data = await fetchUserDetails(token);

    if (data.success){
        return res.status(200).json({
            success: true,
            data : data.details
        });
    }
    return res.status(400).json({success : false});
}