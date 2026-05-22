import * as z from "zod"

export const registerSchema=z.object({
  firstName: z.string().trim().min(3, "Name must be at least 3 characters").max(40,"Name must be less than 40 characters"),
  lastName: z.string().trim().min(3, "Name must be at least 3 characters").max(40,"Name must be less than 40 characters"),
  email:z.string().email("Invalid email address"),
  password:z.string()
  .min(6,"Password must be atleast 6 characters")
  .max(20,"Password must be less than 20 characters")
  .regex(/[A-Z]/, "Must include uppercase")
  .regex(/[a-z]/, "Must include lowercase")
  .regex(/[0-9]/, "Must include a number"),

  confirmPassword:z.string(),
  role:z.enum(["User","Gymowner","Trainer"])
})
.refine((data)=>data.password===data.confirmPassword,{
  message:"Password do not match",
  path:["confirmPassword"]
})
 
export type RegisterFormData=z.infer<typeof registerSchema>