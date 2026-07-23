import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
    try {
        // Get the Authorization header
        const authHeader = req.headers.authorization;

        // Check if token exists
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
            success: false,
            message: "Not authorized. Token missing.",
            });
        }

        // Extract token
        const token = authHeader.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Store logged-in user ID in request object
        req.user = decoded.id;

        // Move to the next middleware/controller
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);

        return res.status(401).json({
            success: false,
            message: "Not authorized. Invalid token.",
        });
    }
};

export default protect;