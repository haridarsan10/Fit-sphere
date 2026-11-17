
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Phone,
} from "lucide-react";

import { gymSchema, type GymFormValues } from "../schemas/GymSchema";
import { useAddGym } from "../hooks/useAddGym";

import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AddGym() {
  const { mutate, isPending } = useAddGym();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GymFormValues>({
    resolver: zodResolver(gymSchema),
    defaultValues: {
      address: {
        country: "India",
      },
    },
  });

  const onSubmit = (data: GymFormValues) => {
      mutate(data);
    };

    const onInvalid = (errors: any) => {
      console.log("VALIDATION FAILED:", errors);
    };

  return (
    <PageContainer>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate({ to: "/gym-owner/gyms" })}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <PageHeader
          title="Add Gym"
          description="Register a new gym under your ownership."
        />
      </div>

      <form
        className="mt-6 space-y-6"
          onSubmit={handleSubmit(onSubmit, onInvalid)}
      >
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Basic Information</CardTitle>
            </div>
            <CardDescription>
              Enter the basic details about your gym.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-5">
              <div className="grid gap-2">
                <Label htmlFor="name">Gym Name</Label>
                <Input
                  id="name"
                  placeholder="Enter gym name"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your gym"
                  rows={4}
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="gym_type">Gym Type</Label>
                <Input
                  id="gym_type"
                  placeholder="e.g. Fitness Center, CrossFit, Yoga, Mixed..."
                  {...register("gym_type")}
                />
                {errors.gym_type && (
                  <p className="text-sm text-red-500">
                    {errors.gym_type.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Details */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Location Details</CardTitle>
            </div>
            <CardDescription>
              Enter the physical address of your gym.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="address.address_line_1">
                  Address Line 1
                </Label>
                <Input
                  id="address.address_line_1"
                  placeholder="Building name, street, road"
                  {...register("address.address_line_1")}
                />
                {errors.address?.address_line_1 && (
                  <p className="text-sm text-red-500">
                    {errors.address.address_line_1.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="address.address_line_2">
                  Address Line 2 (Optional)
                </Label>
                <Input
                  id="address.address_line_2"
                  placeholder="Nearby landmark, area, etc."
                  {...register("address.address_line_2")}
                />
                {errors.address?.address_line_2 && (
                  <p className="text-sm text-red-500">
                    {errors.address.address_line_2.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="address.city">City</Label>
                <Input
                  id="address.city"
                  placeholder="Enter city"
                  {...register("address.city")}
                />
                {errors.address?.city && (
                  <p className="text-sm text-red-500">
                    {errors.address.city.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="address.district">District</Label>
                <Input
                  id="address.district"
                  placeholder="Enter district"
                  {...register("address.district")}
                />
                {errors.address?.district && (
                  <p className="text-sm text-red-500">
                    {errors.address.district.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="address.state">State</Label>
                <Input
                  id="address.state"
                  placeholder="Enter state"
                  {...register("address.state")}
                />
                {errors.address?.state && (
                  <p className="text-sm text-red-500">
                    {errors.address.state.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="address.pincode">Pincode</Label>
                <Input
                  id="address.pincode"
                  placeholder="Enter pincode"
                  {...register("address.pincode")}
                />
                {errors.address?.pincode && (
                  <p className="text-sm text-red-500">
                    {errors.address.pincode.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="address.country">Country</Label>
                <Input
                  id="address.country"
                  placeholder="Enter country"
                  {...register("address.country")}
                />
                {errors.address?.country && (
                  <p className="text-sm text-red-500">
                    {errors.address.country.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Contact Information</CardTitle>
            </div>
            <CardDescription>
              Provide contact information for your gym.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="contact_phone">Contact Number</Label>
                <Input
                  id="contact_phone"
                  type="tel"
                  placeholder="Enter contact number"
                  {...register("contact_phone")}
                />
                {errors.contact_phone && (
                  <p className="text-sm text-red-500">
                    {errors.contact_phone.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter gym email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate({ to: "/gym-owner/gym" })}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit Gym"}
          </Button>
        </div>
      </form>
    </PageContainer>
  );
}
