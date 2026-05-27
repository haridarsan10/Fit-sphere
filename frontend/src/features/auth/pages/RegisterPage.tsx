import { Button } from "@/components/ui/button"
import { useRegister } from "../hooks/useRegister"
import { Controller,useForm } from "react-hook-form";
import type { RegisterFormData} from "../schemas/registerSchema";
import { registerSchema } from "../schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import '../styles/RegisterPage.css'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RegisterPage(){

  const roles=["User","Gymowner","Trainer"] as const

  const {mutate,isPending}=useRegister()

  const {register,handleSubmit,control,formState:{errors}}=useForm<RegisterFormData>({
    defaultValues:{role:'User'},
    resolver:zodResolver(registerSchema)
  })

  const onSubmit=(data:RegisterFormData)=>{
    mutate(data)
  }




  return(
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Register your account</CardTitle>
        <CardDescription>
          Enter the following information to register
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
    
            <div className="grid gap-2">
              <Label htmlFor="name">Firstname</Label>
              <Input
                {...register("firstName")}
                id="name"
              />
              {errors.firstName && (
                <p  className="errorMessage">{errors.firstName.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="name">Lastname</Label>
              <Input
                {...register("lastName")}
                id="name"
              />
              {errors.lastName && (
                <p  className="errorMessage">{errors.lastName.message}</p>
              )}
            </div>  

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register('email')}
                id="email"
                type="email"
                placeholder="user@example.com"
              />
              {errors.email && (
                <p className="errorMessage">{errors.email.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input {...register('password')} id="password" type="password" />
              {errors.password && (
                <p className="errorMessage">{errors.password.message}</p>
              )}
            </div>

             <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
              </div>
              <Input {...register('confirmPassword')} id="confirmPassword" type="password" />
              {errors.confirmPassword && (
                <p  className="errorMessage">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div>
              <Controller
                  control={control}
                  name="role"
                  render={({ field }) => (
                    <Combobox
                      items={roles}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <ComboboxInput placeholder="Select a role" />

                      <ComboboxContent>
                        <ComboboxEmpty>No items found.</ComboboxEmpty>

                        <ComboboxList>
                          {(item) => (
                            <ComboboxItem
                              key={item}
                              value={item}
                            >
                              {item}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                  )}
                />
            </div>
          </div>

          <CardFooter className="flex-col gap-2">
            <Button type="submit" disabled={isPending} className="w-full" >
              {isPending? "Registering...":"Register"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
      
    </Card>
    </div>
  )
}