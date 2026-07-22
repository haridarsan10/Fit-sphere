export interface LoginRequest{
  email:string,
  password:string
}

export interface LoginResponse{
  accessToken: string;
  refreshToken?: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: "User" | "Gymowner" | "Trainer"
  iat: number;
  exp: number;
}

export const dashboardRoutes = {
  User: "/user/dashboard",
  Gymowner: "/gym-owner/dashboard",
  Trainer: "/trainer/dashboard",
  Admin: "/admin/dashboard",
} as const;

