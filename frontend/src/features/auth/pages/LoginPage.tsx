import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"


import { useLogin } from "../hooks/useLogin"
import { useForm } from "react-hook-form"
import type { RegisterFormData } from "../schemas/registerSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginFormData } from "../schemas/loginSchema"


export default function LoginPage() {

  const {mutate,isPending}=useLogin()
  
  const {register,handleSubmit,formState:{errors}}=useForm<LoginFormData>({
    resolver:zodResolver(loginSchema)
  })

  const onSubmit=(data:LoginFormData)=>{
    mutate(data)
  }

  return (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>

                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />

                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <Button type="submit" className="w-full">
                {isPending?"Logging In":"Login"}
              </Button>

              <Button variant="outline" className="w-full" type="button">
                Login with Google
              </Button>
            </div>
          </form>
        </CardContent>
      {/* <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" >
          Login
        </Button>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter> */}
    </Card>
    </div>
  )
}
