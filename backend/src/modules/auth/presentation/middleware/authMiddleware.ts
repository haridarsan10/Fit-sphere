import type { Request, Response, NextFunction } from "express"
import type TokenService from "../../application/services/TokenService.js"

export default function authMiddleware(tokenService: TokenService) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization

      if (!authHeader) {
        return res.status(401).json({ message:"No token provided"})
      }

      const parts = authHeader.split(" ")

      if (parts.length !== 2) {
        return res.status(401).json({ message:"Invalid token format"})
      }

      const token = parts[1]

      if(!token){
        throw new Error("Unauthorized")
      }
      
      const decoded = tokenService.verifyToken(token)

      ;(req as any).user = decoded

      next()

    } catch (error) {
      return res.status(401).json({ message: "Invalid token" })
    }
  }
}