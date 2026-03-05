import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        const {success} = await rateLimit.limit("my-limiter-key");
        if(!success){
            return res.status(429).json({message: "Too many requests. Please try again later."});
        }
        
        next();
    } catch (error) {
        console.error("Rate Limiter Error:", error);
        res.status(500).json({message: "Internal Server Error"});
        next(error);
    }
};

export default rateLimiter;