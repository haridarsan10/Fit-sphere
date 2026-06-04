import * as z from "zod"

export const loginSchema=z.object({
  email:z.string().email("Invalid email address"),
  password:z.string()
  .min(6,"Password must be atleast 6 characters")
  .max(20,"Password must be less than 20 characters")
  .regex(/[A-Z]/, "Must include uppercase")
  .regex(/[a-z]/, "Must include lowercase")
  .regex(/[0-9]/, "Must include a number"),
})


export type LoginFormData=z.infer<typeof loginSchema>