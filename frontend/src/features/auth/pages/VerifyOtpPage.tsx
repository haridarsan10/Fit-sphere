import { Button } from "@/components/ui/button"

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

export function VerifyOtpPage() {
  return (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Verify your account</CardTitle>
        <CardDescription>
          Enter your otp 
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
          </InputOTP>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Verify
        </Button>
      </CardFooter>
    </Card>
  </div>
  )
}
