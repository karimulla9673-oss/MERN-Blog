import jwt from "jsonwebtoken"

export const isAuthenticated = async (req, res, next) => {
    try {
        // Try cookie first
        let token = req.cookies.token;
        
        // If no cookie, check Authorization header
        if (!token) {
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.split(' ')[1];
            }
        }

        if(!token){
            return res.status(401).json({
                message:"User not authenticated",
                success:false,
            })
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY)
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false,
            })
        }
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message:"Authentication failed",
            success:false,
        })
    }
}