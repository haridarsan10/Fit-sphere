import { Button } from "@/components/ui/button"
import { otpSchema, type OtpSchemaType } from "../schemas/otpSchema"
import { useSearch } from "@tanstack/react-router"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"


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
import { useVerifyOtp } from "../hooks/useVerifyOtp"
import { Route, RouteApi } from "@tanstack/react-router"
import { useForm,Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

export function VerifyOtpPage() {

  
  const {mutate}=useVerifyOtp()
  const search=useSearch({from:'/verify-otp'})

  const { control,handleSubmit,formState:{errors},}=useForm<OtpSchemaType>(
    {resolver:zodResolver(otpSchema),
      defaultValues:{otp:""}}
  )

  const onSubmit=(data:OtpSchemaType)=>{
    mutate({
    otp: data.otp,
    email: search.email,
     });
  }

  return (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Verify your account</CardTitle>
        <CardDescription>
          Enter your otp 
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="flex justify-center">
              <Controller
                name="otp"
                control={control}
                render={({ field }) => (
                  <InputOTP
                    maxLength={6}
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />
            </div>

            {errors.otp && (
              <p className="text-sm text-red-500 mt-2 text-center">
                {errors.otp.message}
              </p>
            )}
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Verify
            </Button>
          </CardFooter>
        </form>
    </Card>
  </div>
  )
}
