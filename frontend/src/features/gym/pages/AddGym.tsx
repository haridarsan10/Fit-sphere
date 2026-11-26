
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";

import {
  ArrowLeft,
  Building2,
  MapPin,
  Phone,
  Plus,
  X,
} from "lucide-react";

import {
  gymSchema,
  type GymFormInput,
  type GymFormValues,
} from "../schemas/GymSchema";

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
import { Switch } from "@/components/ui/switch";

const commonFacilities = [
  "Cardio Equipment",
  "Weight Training",
  "Personal Training",
  "Locker Room",
  "Shower",
  "Parking",
  "Swimming Pool",
  "Sauna",
  "Steam Room",
  "Yoga Studio",
  "CrossFit",
  "Indoor Cycling",
];

const days = [
  { label: "Monday", value: "monday" },
  { label: "Tuesday", value: "tuesday" },
  { label: "Wednesday", value: "wednesday" },
  { label: "Thursday", value: "thursday" },
  { label: "Friday", value: "friday" },
  { label: "Saturday", value: "saturday" },
  { label: "Sunday", value: "sunday" },
] as const;

export default function AddGym() {
  const { mutate, isPending } = useAddGym();
  const navigate = useNavigate();

  const [customFacility, setCustomFacility] = useState("");

  const form = useForm<GymFormInput, unknown, GymFormValues>({
    resolver: zodResolver(gymSchema),

    defaultValues: {
      address: {
        country: "India",
      },

      facilities: [],

      operating_hours: {
        monday: { is_open: false, open: "", close: "" },
        tuesday: { is_open: false, open: "", close: "" },
        wednesday: { is_open: false, open: "", close: "" },
        thursday: { is_open: false, open: "", close: "" },
        friday: { is_open: false, open: "", close: "" },
        saturday: { is_open: false, open: "", close: "" },
        sunday: { is_open: false, open: "", close: "" },
      },

      max_members: 100,
      max_trainers: 10,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = form;

  const onSubmit = (data: GymFormValues) => {
    mutate(data);
  };

  const onInvalid = (errors: unknown) => {
    console.log("VALIDATION FAILED:", errors);
  };

  return (
    <PageContainer>
      <div className="flex items-center gap-3">
        <Button
          type="button"
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

        {/* Business Details */}
        <Card>
          <CardHeader>
            <CardTitle>Business Details</CardTitle>

            <CardDescription>
              Additional registration information (optional).
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="established_year">
                Established Year
              </Label>

              <Input
                id="established_year"
                type="number"
                {...register("established_year", {
                  setValueAs: (value) =>
                    value === "" ? undefined : Number(value),
                })}
              />

              {errors.established_year && (
                <p className="text-sm text-red-500">
                  {errors.established_year.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="business_details.legal_name">
                Legal Business Name
              </Label>

              <Input
                id="business_details.legal_name"
                {...register("business_details.legal_name")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="business_details.gstin">GSTIN</Label>

              <Input
                id="business_details.gstin"
                {...register("business_details.gstin")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="business_details.registration_number">
                Registration Number
              </Label>

              <Input
                id="business_details.registration_number"
                {...register("business_details.registration_number")}
              />
            </div>
          </CardContent>
        </Card>

        {/* Additional Contact Details */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Contact Details</CardTitle>

            <CardDescription>
              Add alternate contact and social media information (optional).
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="contact.alternate_phone">
                Alternate Phone
              </Label>

              <Input
                id="contact.alternate_phone"
                {...register("contact.alternate_phone")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="contact.website">Website</Label>

              <Input
                id="contact.website"
                placeholder="https://example.com"
                {...register("contact.website")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="contact.social_links.instagram">
                Instagram
              </Label>

              <Input
                id="contact.social_links.instagram"
                {...register("contact.social_links.instagram")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="contact.social_links.facebook">
                Facebook
              </Label>

              <Input
                id="contact.social_links.facebook"
                {...register("contact.social_links.facebook")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="contact.social_links.youtube">
                YouTube
              </Label>

              <Input
                id="contact.social_links.youtube"
                {...register("contact.social_links.youtube")}
              />
            </div>
          </CardContent>
        </Card>

        {/* Facilities */}
        <Card>
          <CardHeader>
            <CardTitle>Facilities</CardTitle>

            <CardDescription>
              Select the facilities available at your gym or add custom ones.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            <Controller
              control={control}
              name="facilities"
              render={({ field }) => {
                const selectedFacilities = field.value ?? [];

                const toggleFacility = (facility: string) => {
                  const isSelected =
                    selectedFacilities.includes(facility);

                  field.onChange(
                    isSelected
                      ? selectedFacilities.filter(
                        (item) => item !== facility
                      )
                      : [...selectedFacilities, facility]
                  );
                };

                const addCustomFacility = () => {
                  const value = customFacility.trim();

                  const alreadyExists = selectedFacilities.some(
                    (item) =>
                      item.toLowerCase() === value.toLowerCase()
                  );

                  if (value && !alreadyExists) {
                    field.onChange([...selectedFacilities, value]);
                  }

                  setCustomFacility("");
                };

                return (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Common Facilities</Label>

                      <div className="flex flex-wrap gap-2">
                        {commonFacilities.map((facility) => {
                          const selected =
                            selectedFacilities.includes(facility);

                          return (
                            <Button
                              key={facility}
                              type="button"
                              size="sm"
                              variant={selected ? "default" : "outline"}
                              onClick={() => toggleFacility(facility)}
                              aria-pressed={selected}
                            >
                              {facility}
                            </Button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <Label>Add Custom Facility</Label>

                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter a facility not listed above"
                          value={customFacility}
                          onChange={(event) =>
                            setCustomFacility(event.target.value)
                          }
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              event.preventDefault();
                              addCustomFacility();
                            }
                          }}
                        />

                        <Button
                          type="button"
                          onClick={addCustomFacility}
                          disabled={!customFacility.trim()}
                        >
                          <Plus className="mr-1 h-4 w-4" />
                          Add
                        </Button>
                      </div>
                    </div>

                    {selectedFacilities.length > 0 && (
                      <div className="space-y-2 pt-3">
                        <Label>Selected Facilities</Label>

                        <div className="flex flex-wrap gap-2">
                          {selectedFacilities.map((facility) => (
                            <div
                              key={facility}
                              className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-sm"
                            >
                              <span>{facility}</span>

                              <button
                                type="button"
                                onClick={() => toggleFacility(facility)}
                                aria-label={`Remove ${facility}`}
                                className="text-muted-foreground hover:text-destructive"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }}
            />
          </CardContent>
        </Card>

        {/* Operating Hours */}
        <Card>
          <CardHeader>
            <CardTitle>Operating Hours</CardTitle>

            <CardDescription>
              Set the opening and closing times for each day. Leave a day
              switched off if your gym is closed.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {days.map((day) => {
              const isOpen = watch(
                `operating_hours.${day.value}.is_open`
              );

              return (
                <div
                  key={day.value}
                  className="space-y-3 rounded-lg border p-4"
                >
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">
                      {day.label}
                    </Label>

                    <Controller
                      control={control}
                      name={`operating_hours.${day.value}.is_open`}
                      render={({ field }) => (
                        <Switch
                          checked={field.value ?? false}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                  </div>

                  {isOpen ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label
                          htmlFor={`operating_hours.${day.value}.open`}
                        >
                          Opening Time
                        </Label>

                        <Input
                          type="time"
                          id={`operating_hours.${day.value}.open`}
                          {...register(
                            `operating_hours.${day.value}.open`
                          )}
                        />

                        {errors.operating_hours?.[day.value]?.open && (
                          <p className="text-sm text-red-500">
                            {
                              errors.operating_hours[day.value]?.open
                                ?.message
                            }
                          </p>
                        )}
                      </div>

                      <div className="grid gap-2">
                        <Label
                          htmlFor={`operating_hours.${day.value}.close`}
                        >
                          Closing Time
                        </Label>

                        <Input
                          type="time"
                          id={`operating_hours.${day.value}.close`}
                          {...register(
                            `operating_hours.${day.value}.close`
                          )}
                        />

                        {errors.operating_hours?.[day.value]?.close && (
                          <p className="text-sm text-red-500">
                            {
                              errors.operating_hours[day.value]?.close
                                ?.message
                            }
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Closed
                    </p>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>


        {/* Capacity Details */}
        <Card>
          <CardHeader>
            <CardTitle>Gym Capacity</CardTitle>

            <CardDescription>
              Set the maximum number of members and trainers your gym can accommodate.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="max_members">Maximum Members</Label>

              <Input
                id="max_members"
                type="number"
                min={1}
                {...register("max_members", {
                  valueAsNumber: true,
                })}
              />

              {errors.max_members && (
                <p className="text-sm text-red-500">
                  {errors.max_members.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="max_trainers">Maximum Trainers</Label>

              <Input
                id="max_trainers"
                type="number"
                min={1}
                {...register("max_trainers", {
                  valueAsNumber: true,
                })}
              />

              {errors.max_trainers && (
                <p className="text-sm text-red-500">
                  {errors.max_trainers.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>


        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate({ to: "/gym-owner/gyms" })}
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
