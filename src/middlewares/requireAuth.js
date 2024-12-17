import jwt from "jsonwebtoken";

export const requireAuth = async(req, res, next) => {
    try{
        const authHeader = req.headers.authorization

        if(!authHeader) return res.status(401).json({
            
            message: "Unauthorization X"
        });
        const token = authHeader.split(" ")[1];
        if(!token) return res.json({
            message: "Invalid token",
            response: false
        })
        
        jwt.verify(token, process.env.SECRET_KEY , (err, mesero) => {
            

            if(err) {        
                return res.json({
                response: false,
                message: "Invalid token"
            })}

            req.user = mesero;
            next();
        
        }
        )
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong"
        }
    );
    }
};
