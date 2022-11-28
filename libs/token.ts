const jwt = require('jsonwebtoken')

export const generateAccessToken = (word: string | number) => {
    return jwt.sign(
            { word },
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: "20m" }
        )
}

export const generateRefreshToken = (word: string | number) => {
    return jwt.sign(
            { word },
            process.env.REFRESH_TOKEN_SECRET, 
            { expiresIn: "120m" }
        )
}
